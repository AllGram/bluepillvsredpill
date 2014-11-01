from kodemon import kodemon

@kodemon
def twoTimesTable():
	for i in range(1, 11):
		print i * 2
		
@kodemon
def threeTimesTable():
	for i in range(1, 11):
		print i * 3
		
@kodemon
def fibonacci():
	first = 0
	second = 1
	theSum = 0
	for i in range(1, 11):
		theSum = first + second
		print theSum
		first = second
		second = theSum

@kodemon
def factorial(num):
	sum = 1
	for i in range(1, num + 1):
		sum = sum * i
	print sum

if __name__ == "__main__":
	print "printing two times table:"
	twoTimesTable()
	print "printing three times table:"
	threeTimesTable()
	print "printing fibonacci:"
	fibonacci()
	print "printing 20 factorial:"
	factorial(20)