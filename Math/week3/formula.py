observed = [
    [25, 35],
    [30, 20],
    [15,25]
]

rows = len(observed)
cols = len(observed[0])

row_sums = []
for row in observed:
    row_sums.append(sum(row))

col_sums = []
for j in range(cols):
    total = 0
    for i in range(rows):
        total += observed[i][j]
    col_sums.append(total)

N = sum(row_sums)

expected = []

for i in range(rows):
    expected_row = []

    for j in range(cols):
        E = (row_sums[i] * col_sums[j]) / N
        E = round(E, 2)
        expected_row.append(E)

    expected.append(expected_row)

chi_square = 0

for i in range(rows):
    for j in range(cols):

        O = observed[i][j]
        E = expected[i][j]

        value = ((O - E) ** 2) / E
        value = round(value, 2)

        print(f"O{i+1}{j+1} = {O}, E{i+1}{j+1} = {E}, result = {value}")

        chi_square += value

chi_square = round(chi_square, 2)

df = (rows - 1) * (cols - 1)

print()
print("Chi-square =", chi_square)
print("df =", df)