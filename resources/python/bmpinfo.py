import struct

def is_bmp(info):
    if(info[0] == b'B' and (info[1] == b'M' or info[1] == b'A')):
        return [info[-4], info[-3], info[-1]]
    else:
        print('Is not Bmp\n')
        return [0, 0, 0]

if __name__ == '__main__':
    fp = open('1.png', 'rb')
    info = fp.read(30)
    bmp_info = struct.unpack('<ccIIIIIIHH', info)
    func_info = is_bmp(bmp_info)
    print('bmp\'s infomation is ', func_info)