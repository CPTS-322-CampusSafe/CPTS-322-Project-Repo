from .validators import validate_register_data

def test_validate_register_data_normal():
    errors = validate_register_data({ "phone_number": "888-222-6666", "user_data": "" })
    assert errors == None

def test_validate_register_data_edge():
    errors = validate_register_data({ "user_data": "" })
    assert errors == { "phone_number": ["This field is required"] }