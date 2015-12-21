from django.conf.urls import patterns, url, include
from slums import views

urlpatterns = patterns('',
	url(r'^$', views.index, name='index'),
	url(r'^api/users/', views.user_api, name='user_api'),
	url(r'^api/landlords/', views.landlord_api, name='landlord_api'),
	url(r'^api/properties/', views.property_api, name='property_api'),
	url(r'^api/landlord_by_id/(?P<id>\d+)$', views.landlord_by_id, name='landlord_by_id'),
	url(r'^api/property_by_landlord/(?P<landlordId>\d+)$', views.property_by_landlord, name='property_by_landlord'),
	url(r'^api/property_info/(?P<landlordId>\d+)$', views.property_info, name='property_info'),
	url(r'^api/reviews/', views.propRev_api, name='reviews'),
	url(r'^api/reviews_by_prop/(?P<propId>\d+)$', views.propRev_by_propId, name='reviews'),
)
