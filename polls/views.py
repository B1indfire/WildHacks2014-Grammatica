from django.shortcuts import render

# Create your views here.
from django.http import Http404, HttpResponse
from django.shortcuts import render_to_response
from django.template import loader, RequestContext
from polls.models import Poll
from django.core.context_processors import csrf
from polls.process import processSentence

def home(request):
    return HttpResponse("Yo dawg")

def sentence(request):
    revised=processSentence(request.POST['data'])
    c = {}
    c.update(csrf(request))
    c['revised']=revised
    #c.update(revised)
    return HttpResponse(render(request,'index.html', c))#{'revised':revised, 'csrf_token':csrf(request)}))

def index(request):
    poll_list = Poll.objects.all()
    c = {}
    c.update(csrf(request))
    revised=""
    c.update(revised)
    return HttpResponse(render(request,'index.html',c))
