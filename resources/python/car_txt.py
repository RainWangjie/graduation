z = ['A', 'B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M',
     'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'W', 'X', 'Y', 'Z']
carlist = {
    'A': [],
    'B': [],
    'C': [],
    'D': [],
    'F': [],
    'G': [],
    'H': [],
    'J': [],
    'K': [],
    'L': [],
    'M': [],
    'N': [],
    'O': [],
    'P': [],
    'Q': [],
    'R': [],
    'S': [],
    'T': [],
    'W': [],
    'X': [],
    'Y': [],
    'Z': []
}
index = -1
with open('autoname.txt', 'r') as f:
    for line in f.readlines():
        carname = line.strip()
        key = z[index]
        if len(carname) == 1:
            index = index + 1
        else:
            name_src = carname.split(' ')
            carItem = {'name': name_src[0], 'img_src': name_src[2]}
            carlist[key].append(carItem)
print(carlist)
