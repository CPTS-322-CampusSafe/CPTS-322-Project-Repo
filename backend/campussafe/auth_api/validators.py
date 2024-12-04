from phonenumber_field.validators import validate_international_phonenumber

def validate_register_data(data):
    # Make sure phone_number field exists
    try:
        phone_number = data["phone_number"]
    except:
        return { "phone_number": ["This field is required"] }

    # Make sure the phone number is a valid phone number
    #try:
    #    validate_international_phonenumber(phone_number)
    #except:
    #    return { "phone_number": ["Invalid phone number"] }

    # Make sure a user_data section is present
    try:
        user_data = data["user_data"]
    except:
        return { "user_data": ["This field is required"] }
    
    return None

