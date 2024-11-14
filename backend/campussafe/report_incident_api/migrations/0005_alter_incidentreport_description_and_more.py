# Generated by Django 5.1.1 on 2024-11-12 00:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('report_incident_api', '0004_rename_isresolved_incidentreport_is_resolved_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='incidentreport',
            name='description',
            field=models.TextField(blank=True),
        ),
        migrations.AlterField(
            model_name='incidentreport',
            name='happened_at',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='incidentreport',
            name='location',
            field=models.CharField(blank=True, default='', max_length=100),
        ),
        migrations.AlterField(
            model_name='incidentreport',
            name='resolved_at',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='incidentreport',
            name='summary',
            field=models.CharField(blank=True, max_length=300),
        ),
        migrations.AlterField(
            model_name='incidentreport',
            name='verified_at',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]