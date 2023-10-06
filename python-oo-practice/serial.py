"""Python serial number generator."""


class SerialGenerator:
    """Machine to create unique incrementing serial numbers.

    >>> serial = SerialGenerator(start=100)

    >>> serial.generate()
    100

    >>> serial.generate()
    101

    >>> serial.generate()
    102

    >>> serial.reset()

    >>> serial.generate()
    100
    """

    def __init__(self, start,):
        """Initialize instance of SerialGenerator with start number"""
        self.start = start
        self.serial_num = start

    def generate(self):
        """Function that returns a unique incrementing serial number"""
        current_serial = self.serial_num
        self.serial_num += 1
        return current_serial

    def reset(self):
        """Resets the serial number back to the start"""
        self.serial_num = self.start
