# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('slums', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='propertyrate',
            old_name='review',
            new_name='text_review',
        ),
        migrations.RemoveField(
            model_name='property',
            name='rent',
        ),
        migrations.RemoveField(
            model_name='property',
            name='review',
        ),
        migrations.RemoveField(
            model_name='property',
            name='tenants',
        ),
        migrations.AddField(
            model_name='propertyrate',
            name='hate_review',
            field=models.CharField(default=None, max_length=1000),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='propertyrate',
            name='love_review',
            field=models.CharField(default=None, max_length=1000),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='propertyrate',
            name='rent',
            field=models.FloatField(default=-1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='propertyrate',
            name='tenants',
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
    ]
