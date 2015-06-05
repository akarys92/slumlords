from django.conf.urls import patterns, url, include
from slums import views

urlpatterns = patterns('',
	url(r'^$', views.index, name='index'),
	url(r'^api/users/', views.user_api, name='user_api'),
	url(r'^api/landlords/', views.landlord_api, name='landlord_api'),
	url(r'^api/properties/', views.property_api, name='property_api'),

)