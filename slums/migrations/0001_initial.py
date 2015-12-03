# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Landlord',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('first_name', models.CharField(max_length=30)),
                ('last_name', models.CharField(max_length=30)),
                ('added_on', models.DateTimeField(auto_now_add=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='LandLordRate',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('rating', models.IntegerField()),
                ('review', models.CharField(max_length=5000)),
                ('availability', models.IntegerField()),
                ('helpfulness', models.IntegerField()),
                ('owner', models.ForeignKey(to='slums.Landlord')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Property',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('street_address', models.CharField(max_length=500)),
                ('apt_number', models.CharField(max_length=10)),
                ('lattitude', models.FloatField()),
                ('longitude', models.FloatField()),
                ('review', models.CharField(max_length=1000)),
                ('rent', models.FloatField()),
                ('tenants', models.IntegerField()),
                ('owner', models.ForeignKey(to='slums.Landlord')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='PropertyRate',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('rating', models.IntegerField()),
                ('review', models.CharField(max_length=5000)),
                ('Property', models.ForeignKey(to='slums.Property')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Rev',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('text', models.CharField(max_length=1000)),
                ('rating', models.IntegerField()),
                ('prop', models.ForeignKey(to='slums.Property')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(default=django.utils.timezone.now, verbose_name='last login')),
                ('username', models.CharField(unique=True, max_length=25)),
                ('email', models.EmailField(unique=True, max_length=50)),
                ('active', models.BooleanField(default=True)),
                ('member_since', models.DateTimeField(auto_now_add=True)),
                ('is_super_user', models.BooleanField(default=False)),
            ],
            options={
                'abstract': False,
            },
            bases=(models.Model,),
        ),
        migrations.AddField(
            model_name='property',
            name='tenant',
            field=models.ForeignKey(to='slums.User'),
            preserve_default=True,
        ),
    ]
