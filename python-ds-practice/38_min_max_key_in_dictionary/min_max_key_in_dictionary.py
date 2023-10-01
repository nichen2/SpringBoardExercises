def min_max_keys(d):
    """Return tuple (min-keys, max-keys) in d.

        >>> min_max_keys({2: 'a', 7: 'b', 1: 'c', 10: 'd', 4: 'e'})
        (1, 10)

    Works with any kind of key that can be compared, like strings:

        >>> min_max_keys({"apple": "red", "cherry": "red", "berry": "blue"})
        ('apple', 'cherry')
    """
    my_keys = list(d.keys())
    min = my_keys[0]
    max = my_keys[0]
    for key in d.keys():
        min = key if key < min else min
        max = key if key > max else max
    return (min, max)
