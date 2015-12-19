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

def createProperty(propInfo, propReview, owner):
	#get user object
	#create property object
	#add prop to user
	#print "In createProperty... \n\n\n"
	print "In createProperty"
	print propInfo
	print "\n\n\n"
	try:
		print "Found propertry \n\n\n"
		prop = Property.objects.get(street_address=propInfo)
		print "made it"

	except Property.DoesNotExist:
		print propInfo['prettyAddress']
		# REMOVE THIS
		#user_info = {"username": "test", "email": "test@test.test"}
		#userializer = UserSerializer(data=user_info)

		#if userializer.is_valid():
		#	userializer.save()
		# TO HERE
		propData = {"street_address": propInfo['prettyAddress'], "apt_number": propInfo['apartment_number'], "lattitude": propInfo['lattitude'], "longitude": propInfo['longitude'], "tenant": 1, "owner": owner.id, "review": propReview, "rent": 1.0, "tenants": 1} #DUMMY DATA
		print propData
		#this is not working!!!
		propSerializer = PropertySerializer(data=propData)

		if propSerializer.is_valid():
			prop = propSerializer.save()
		else:
			print propSerializer.errors
			return HttpResponse(status=500)
		

	return prop

	#user.properties.add(prop)
	#print user.properties.add(prop)
	#print "Has Properties \n\n\n"
		#prop = Property.objects.get(street_address=propLookup)
