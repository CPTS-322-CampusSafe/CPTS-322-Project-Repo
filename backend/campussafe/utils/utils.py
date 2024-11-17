
def is_int(val):
    try: 
        int(val)
    except ValueError:
        return False
    except TypeError:
        return False
    else:
        return True