from rest_framework import serializers
from slums.models import  User, Landlord, Property, PropertyRate, LandLordRate

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'id')

class LandLordSerializer(serializers.ModelSerializer):
	class Meta:
		model = Landlord
		fields = ('first_name', 'last_name')

class PropertySerializer(serializers.ModelSerializer):
	class Meta:
		model = Property
		fields = ('street_address', 'apt_number', 'lattitude', 'longitude', 'tenant', 'owner', 'total_reviews', 'average_review')

class PropertyReturnSerializer(serializers.ModelSerializer):
	Landlord = serializers.StringRelatedField()
	class Meta:
		model = Property
		fields = ('street_address', 'apartment_number' ,'lattitude', 'longitude', 'Landlord')

class PropertyRatingSerializer(serializers.ModelSerializer):
	class Meta:
		model = PropertyRate
		fields = ('Property', 'rent', 'tenants', 'rating', 'love_review', 'hate_review', 'text_review')


class LandlordRatingSerializer(serializers.ModelSerializer):
	class Meta:
		model = LandLordRate
		fields = ('owner', 'rating', 'review')