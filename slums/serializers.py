from rest_framework import serializers
from slums.models import  User, Landlord, Property

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
		fields = ('street_address', 'lattitude', 'longitude', 'tenant', 'owner', 'review')

class PropertyReturnSerializer(serializers.ModelSerializer):
	Landlord = serializers.StringRelatedField()
	class Meta:
		model = Property
		fields = ('street_address', 'lattitude', 'longitude', 'Landlord', 'review')