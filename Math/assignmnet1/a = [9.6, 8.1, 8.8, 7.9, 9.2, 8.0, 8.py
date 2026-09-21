b = [504,560,420,600,580,530,490,580]
a = [580,692,700,621,640,561,680,630]
c=0
for i in range(8):
    c+=round(round((a[i]-b[i]),1),2)
    print(round(a[i]-b[i], 1))
    print(round(round((a[i]-b[i]),1)**2,2))
    print()
print(c)