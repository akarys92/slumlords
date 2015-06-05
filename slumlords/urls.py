from django.conf.urls import patterns, include, url
from django.contrib import admin
from slumlords.views import IndexView

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'slumlords.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
	url(r'', include('slums.urls', namespace="slums")),
    	url(r'^admin/', include(admin.site.urls)),
    	url('^.*$', IndexView.as_view(), name='index'),
)
