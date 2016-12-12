from bs4 import BeautifulSoup
html = '''
<dt><a href="http://car.autohome.com.cn/pic/brand-140.html"><img width="50" height="50" src="http://car1.autoimg.cn/logo/brand/50/129609000250860000.jpg"></a><div><a href="http://car.autohome.com.cn/pic/brand-140.html">巴博斯</a></div></dt>
'''
# soup = BeautifulSoup(open('python.html'), 'html.parser')
soup = BeautifulSoup(html)

print(soup.a.img['src'])
