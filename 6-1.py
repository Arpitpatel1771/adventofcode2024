with open("6-1-input.txt", "r", encoding="utf-8") as file:
    input = file.read()


class Map:
    def __init__(self, input):
        self.map = []
        self._construct_map(input)

    def _construct_map(self, input):
        rows = input.split("\n")

        for row in rows:
            self.map.append([x for x in row])

        self._extract_guard_info_from_map()

    def print(self):
        print(f"----------------------")
        for row in self.map:
            print("".join(row))
        print(f"----------------------")

    def _extract_guard_info_from_map(self):
        for i, row in enumerate(self.map):
            for j, col in enumerate(row):
                if col == "^":
                    self.guard_position = (i, j)
                    self.guard_direction_vector = (-1, 0)
                    self.map[i][j] = "X"
                elif col == "v":
                    self.guard_position = (i, j)
                    self.guard_direction_vector = (1, 0)
                    self.map[i][j] = "X"
                elif col == ">":
                    self.guard_position = (i, j)
                    self.guard_direction_vector = (0, 1)
                    self.map[i][j] = "X"
                elif col == "<":
                    self.guard_position = (i, j)
                    self.guard_direction_vector = (0, -1)
                    self.map[i][j] = "X"

    def get_next_direction_vector(self, guard_position, guard_direction_vector):
        try:
            gx0, gy0 = guard_position
            dx, dy = guard_direction_vector
            gx1, gy1 = gx0 + dx, gy0 + dy

            future_spot = self.map[gx1][gy1]
            print(f"Future spot: {future_spot} {gx0} {gy0}")

            while future_spot == "#":
                guard_direction_vector = (
                    guard_direction_vector[1],
                    -1 * guard_direction_vector[0],
                )
                gx1, gy1 = (
                    gx0 + guard_direction_vector[0],
                    gy0 + guard_direction_vector[1],
                )
                future_spot = self.map[gx1][gy1]

            return guard_direction_vector

        except IndexError:
            print("Guard will move out next tick")
            raise IndexError

    def process_simulation_tick(self):
        gx0, gy0 = self.guard_position
        dx, dy = self.get_next_direction_vector(
            self.guard_position, self.guard_direction_vector
        )
        self.guard_direction_vector = (dx, dy)
        self.guard_position = (gx0 + dx, gy0 + dy)
        if self.map[gx0 + dx][gy0 + dy] == "#":
            raise IndexError
        print(f"guard moving to {gx0 + dx} {gy0 + dy}")
        self.map[gx0 + dx][gy0 + dy] = "X"
        # self.print()

    def start_simulation(self):
        while True:
            try:
                self.process_simulation_tick()
            except IndexError:
                break

    def count_guard_visited_spaces(self):
        counter = 0
        for row in self.map:
            for col in row:
                if col == "X":
                    counter += 1
        return counter


map = Map(input)

map.print()

map.start_simulation()

print(map.count_guard_visited_spaces())

map.print()
