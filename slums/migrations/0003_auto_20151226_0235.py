# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('slums', '0002_auto_20151219_0146'),
    ]

    operations = [
        migrations.AddField(
            model_name='property',
            name='average_review',
            field=models.FloatField(default=0),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='property',
            name='total_reviews',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
    ]
