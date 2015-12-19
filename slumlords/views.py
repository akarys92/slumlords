from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.generic.base import TemplateView
from django.utils.decorators import method_decorator
from django.shortcuts import render



class IndexView(TemplateView):
    template_name = "index.html"

    def here():
    	print "here!\n\n\n\n\n"

    @method_decorator(ensure_csrf_cookie)
    def dispatch(self, *args, **kwargs):
        return super(IndexView, self).dispatch(*args, **kwargs)

def redpill(request):
	print "Got it!! \n\n\n\n"
	return render(request, 'redpill.html')