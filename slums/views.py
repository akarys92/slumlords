from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from slums.serializers import UserSerializer, LandLordSerializer, PropertySerializer, PropertyReturnSerializer

from slums.models import User, Landlord, Property

import helpers

def index(request):
	return render(request, 'index.html')

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

	except Property.DoesNotExist:
		print propInfo['prettyAddress']
		# REMOVE THIS
		user_info = {"username": "test", "email": "test@test.test"}
		userializer = UserSerializer(data=user_info)

		if userializer.is_valid():
			userializer.save()
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

@api_view(['GET'])
def property_api(request):
	properties = Property.objects.all()
	serializer = PropertySerializer(properties, many=True)
	return Response(serializer.data)

@api_view(['GET', 'POST'])
def user_api(request):
	if request.method == 'GET':
		users = User.objects.all()
		serializer = UserSerializer(users, many=True)
		return Response(serializer.data)
	elif request.method == 'POST':
		#print "Posting \n\n\n"
		user_info = {"username": request.DATA.get('username'), "email": request.DATA.get('email')}

		serializer = UserSerializer(data=user_info)

		if serializer.is_valid():
			serializer.save()
			#print "Valid serializer \n\n\n"
			#if request.DATA.get("properties"):
			#	print "Has Properties \n\n\n"
			#	propInfo = request.DATA.get("properties")
			#	createProperty(propInfo, request.DATA.get("username"))
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST'])
def landlord_api(request):
	if request.method == 'GET':
		landlords = Landlord.objects.all()
		serializer = LandLordSerializer(landlords, many=True)
		return Response(serializer.data)
	elif request.method == 'POST':
		#if i am creating a landlord, i must also create a property
		#Have to create a landlord and then create the property that he owns
		#prop = createProperty(request.DATA.get('address'), request.DATA.get('review'))
		#print "prop is "
		
		#propObj = []
		#propObj.append(prop.id)
		#print propObj
		landlord_info = {"first_name": request.DATA.get('first_name'), "last_name": request.DATA.get('last_name')}

		serializer = LandLordSerializer(data=landlord_info)
		#print serializer.is_valid()
		if serializer.is_valid():

			owner = Landlord.objects.filter(first_name=request.DATA.get('first_name')).filter(last_name=request.DATA.get('last_name'))
			print "There\n\n\n"
			if len(owner) > 0:
				owner = owner[0]
				print "Owner Found"
			else:
				owner = serializer.save()
				print "Creating new owner"
			
			prettyAddress = helpers.makePrettyAddress(request.DATA.get('address'), request.DATA.get('apartment_number'), request.DATA.get('city'), request.DATA.get('state'), request.DATA.get('zip'))
			print "here"
			#prettyAddress = request.DATA.get('address') + " Apt" + request.DATA.get('apartment_number') +  ", " + request.DATA.get('city') + ", " + request.DATA.get('state') + " " + request.DATA.get('zip')
			print prettyAddress
			aptNum = helpers.aptScrub(request.DATA.get('apartment_number'))
			print aptNum
			propInfo = {
				'prettyAddress': prettyAddress,
				'address': request.DATA.get('address'),
				'apartment_number': aptNum,
				'city': request.DATA.get('city'),
				'state': request.DATA.get('state'),
				'zipCode': request.DATA.get('zip'),
				'lattitude': request.DATA.get('lattitude'),
				'longitude': request.DATA.get('longitude')
			}

			prop = createProperty(propInfo, request.DATA.get('review'), owner)
			print prop
			print "\n\n\n"
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
@api_view(['GET'])
def landlord_by_id(request, id):
	landlord = Landlord.objects.get(pk=id)
	serializer = LandLordSerializer(landlord)
	return Response(serializer.data)

@api_view(['GET'])
def property_by_landlord(request, landlordId):
	prop = Property.objects.get(owner=landlordId)
	serializer = PropertySerializer(prop, many=True)
	return Response(serializer.data)

@api_view(['GET'])
def property_info(request, landlordId):

	print landlordId
	llId = landlordId
	landlord = Landlord.objects.get(pk=llId)
	print "HERE"
	landlordSerializer = LandLordSerializer(landlord)
	print "There"
	#print landlordSerializer.data

	props = Property.objects.filter(owner=llId)
	print "blah"
	propSerializer = PropertySerializer(props, many=True)

	print propSerializer.data
	dataObj = {'landlord': landlordSerializer.data, 'properties': propSerializer.data}
	print dataObj
	return Response(dataObj)






