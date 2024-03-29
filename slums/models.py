from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import UserManager

class User(AbstractBaseUser):
	username = models.CharField(max_length=25, unique=True)
	email = models.EmailField(max_length=50, unique=True)
	active = models.BooleanField(default=True)
	member_since = models.DateTimeField(auto_now_add=True)
	is_super_user = models.BooleanField(default=False)

	USERNAME_FIELD = 'username'
	objects = UserManager()

	def __str__(self):
		return self.username

	def _unicode_(self):
		return self.email

	def get_full_name(self):
		return ' '.join([self.first_name, self.last_name])

	def get_short_name(self):
		return self.first_name

class Landlord(models.Model):
	first_name = models.CharField(max_length=30)
	last_name = models.CharField(max_length=30)
	added_on = models.DateTimeField(auto_now_add=True)

#Property should have a foreign key field to Landlord titled 'owner' instead of the current many to many setup. 
#Going to have to change creation logic as well as serializers
class Property(models.Model):
	# Don't think this is needed
	tenant = models.ForeignKey(User)
	street_address = models.CharField(max_length=500)
	apt_number = models.CharField(max_length=10)
	lattitude = models.FloatField()
	longitude = models.FloatField()
	owner = models.ForeignKey(Landlord)
	total_reviews = models.IntegerField()
	average_review = models.FloatField()
	
class Rev(models.Model):
	prop = models.ForeignKey(Property)
	text = models.CharField(max_length=1000)
	rating = models.IntegerField()

class LandLordRate(models.Model):
	owner = models.ForeignKey(Landlord)
	rating = models.IntegerField()
	review = models.CharField(max_length=5000)
	availability = models.IntegerField()
	helpfulness = models.IntegerField()

class PropertyRate(models.Model):
	Property = models.ForeignKey(Property)
	rent = models.FloatField()
	tenants = models.IntegerField()
	rating = models.IntegerField()
	love_review = models.CharField(max_length=1000)
	hate_review = models.CharField(max_length=1000)
	text_review = models.CharField(max_length=5000)




