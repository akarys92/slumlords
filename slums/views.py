from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from slums.serializers import UserSerializer, LandLordSerializer, PropertySerializer, PropertyReturnSerializer

from slums.models import User, Landlord, Property

def index(request):
	return render(request, 'index.html')

def createProperty(propInfo, propReview, owner):
	#get user object
	#create property object
	#add prop to user
	print "In createProperty... \n\n\n"
	try:
		print "Found propertry \n\n\n"
		prop = Property.objects.get(street_address=propInfo)

	except Property.DoesNotExist:
		print "Property not found creating new... \n\n\n"
		propData = {"street_address": propInfo, "lattitude": 10, "longitude": 10, "tenant": 1, "owner": owner.id, "review": propReview} #DUMMY DATA
		#prop = newProperty(propData)
		propSerializer = PropertySerializer(data=propData)
		if propSerializer.is_valid():
			prop = propSerializer.save()
		else:
			print propSerializer
			print "\n\n\n"
			return HttpResponse(status=500)
		#prop.review = propReview;
		##print prop
		#print "\n\n\n\n"
		#prop.save()

	return prop

	#user.properties.add(prop)
	#print user.properties.add(prop)
	print "Has Properties \n\n\n"
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
		print "Posting \n\n\n"
		user_info = {"username": request.DATA.get('username'), "email": request.DATA.get('email')}

		serializer = UserSerializer(data=user_info)

		if serializer.is_valid():
			serializer.save()
			print "Valid serializer \n\n\n"
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
		print "prop is "
		
		#propObj = []
		#propObj.append(prop.id)
		#print propObj
		landlord_info = {"first_name": request.DATA.get('first_name'), "last_name": request.DATA.get('last_name')}
		serializer = LandLordSerializer(data=landlord_info)
		if serializer.is_valid():
			owner = serializer.save()
			prop = createProperty(request.DATA.get('address'), request.DATA.get('review'), owner)
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
