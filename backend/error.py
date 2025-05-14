class InputError(Exception):
    """400-level user input error."""
    pass

class AccessError(Exception):
    """403-level access/authorization error."""
    pass