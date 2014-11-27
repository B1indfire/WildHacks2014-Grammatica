from django.conf.urls import patterns, include, url
from django.contrib import admin
import polls.views

urlpatterns = patterns('',
    # Examples:
    url(r'^$', 'polls.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    (r'^sentence$', 'polls.views.sentence'),
    (r'^index$', 'polls.views.index'),
    (r'^index.html$', 'polls.views.index'),
)
