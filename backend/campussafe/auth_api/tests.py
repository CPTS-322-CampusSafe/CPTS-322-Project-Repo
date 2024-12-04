from django.test import SimpleTestCase
from .validators import validate_register_data

class TestValidateRegisterData(SimpleTestCase):
    def test_validate_register_data_normal(self):
        errors = validate_register_data({ "phone_number": "888-222-6666", "user_data": "" })
        self.assertEqual(errors, None)

    def test_validate_register_data_edge(self):
        errors = validate_register_data({ "user_data": "" })
        self.assertEqual(errors, { "phone_number": ["This field is required"] })