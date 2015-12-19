from django.conf.urls import patterns, include, url
from django.contrib import admin
from slumlords.views import IndexView
from slumlords import views

urlpatterns = patterns('',
	url(r'', include('slums.urls', namespace="slums")),
	url(r'^redpill/', views.redpill, name="redpill"),	
    	url(r'^admin/', include(admin.site.urls)),
    	url('^.*$', IndexView.as_view(), name='index'),
)
