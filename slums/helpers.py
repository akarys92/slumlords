def makePrettyAddress(address, apartment, city, state, zipcode):
	if aptScrub(apartment) != -1:
		return address + " Apt " + apartment + ", " + city + ", " + state + " " + zipcode
	else:
		return address + ", "+ city + ", " + state + " " + zipcode
def aptScrub(apartment):
	print "aptScrub"
	if apartment:
		return apartment
	else:
		return -1