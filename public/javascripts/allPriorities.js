ALL_PRIORITIES = [
    {
        "name": "metatype",
        "priority": {
            "A": [
                {
                    "metatype": "human",
                    "specialAttributes": 9
                },
                {
                    "metatype": "elf",
                    "specialAttributes": 8
                },
                {
                    "metatype": "dwarf",
                    "specialAttributes": 7
                },
                {
                    "metatype": "ork",
                    "specialAttributes": 7
                },
                {
                    "metatype": "troll",
                    "specialAttributes": 5
                }
            ],
            "B": [
                {
                    "metatype": "human",
                    "specialAttributes": 7
                },
                {
                    "metatype": "elf",
                    "specialAttributes": 6
                },
                {
                    "metatype": "dwarf",
                    "specialAttributes": 4
                },
                {
                    "metatype": "ork",
                    "specialAttributes": 4
                },
                {
                    "metatype": "troll",
                    "specialAttributes": 0
                }
            ],
            "C": [
                {
                    "metatype": "human",
                    "specialAttributes": 5
                },
                {
                    "metatype": "elf",
                    "specialAttributes": 3
                },
                {
                    "metatype": "dwarf",
                    "specialAttributes": 1
                },
                {
                    "metatype": "ork",
                    "specialAttributes": 0
                }
            ],
            "D": [
                {
                    "metatype": "human",
                    "specialAttributes": 3
                },
                {
                    "metatype": "elf",
                    "specialAttributes": 0
                }
            ],
            "E": [
                {
                    "metatype": "human",
                    "specialAttributes": 1
                }
            ]
        }
    },
    {
        "name": "attributes",
        "priority": {
            "A": 24,
            "B": 20,
            "C": 16,
            "D": 14,
            "E": 12
        }
    },
    {
        "name": "magic/resonance",
        "priority": {
            "A": [
                {
                    "magic": [
                        {
                            "type": "magician",
                            "magic": 6,
                            "spells": 10,
                            "skills": [
                                {
                                    "magic": 5
                                },
                                {
                                    "magic": 5
                                }
                            ]
                        },
                        {
                            "type": "mystic adept",
                            "magic": 6,
                            "spells": 10,
                            "skills": [
                                {
                                    "magic": 5
                                },
                                {
                                    "magic": 5
                                }
                            ]
                        }
                    ]
                },
                {
                    "resonance": [
                        {
                            "type": "technomancer",
                            "resonance": 6,
                            "complex forms": 5,
                            "skills": [
                                {
                                    "resonance": 5
                                },
                                {
                                    "resonance": 5
                                }
                            ]
                        }
                    ]
                }
            ],
            "B": [
                {
                    "magic": [
                        {
                            "type": "adept",
                            "magic": 6,
                            "active skill": 4
                        },
                        {
                            "type": "aspected magician",
                            "magic": 5,
                            "skill groups": [
                                {
                                    "magic": 4
                                }
                            ]
                        },
                        {
                            "type": "magician",
                            "magic": 4,
                            "spells": 7,
                            "skills": [
                                {
                                    "magic": 4
                                },
                                {
                                    "magic": 4
                                }
                            ]
                        },
                        {
                            "type": "mystic adept",
                            "magic": 4,
                            "spells": 7,
                            "skills": [
                                {
                                    "magic": 4
                                },
                                {
                                    "magic": 4
                                }
                            ]
                        }
                    ]
                },
                {
                    "resonance": [
                        {
                            "type": "technomancer",
                            "resonance": 4,
                            "complex forms": 2,
                            "skills": [
                                {
                                    "resonance": 4
                                },
                                {
                                    "resonance": 4
                                }
                            ]
                        }
                    ]
                }
            ],
            "C": [
                {
                    "magic": [
                        {
                            "type": "adept",
                            "magic": 4,
                            "skills": [
                                {
                                    "active": 2
                                }
                            ]
                        },
                        {
                            "type": "aspected magician",
                            "magic": 3,
                            "skill groups": [
                                {
                                    "magic": 2
                                }
                            ]
                        },
                        {
                            "type": "magician",
                            "magic": 3,
                            "spells": 5
                        },
                        {
                            "type": "mystic adept",
                            "magic": 3,
                            "spells": 5
                        }
                    ]
                },
                {
                    "resonance": [
                        {
                            "type": "technomancer",
                            "resonance": 3,
                            "complex forms": 1
                        }
                    ]
                }
            ],
            "D": [
                {
                    "magic": [
                        {
                            "type": "adept",
                            "magic": 2
                        },
                        {
                            "type": "aspected magician",
                            "magic": 2
                        }
                    ]
                },
                {
                    "resonance": []
                }
            ],
            "E": [
                {
                    "magic": []
                },
                {
                    "resonance": []
                }
            ]
        }
    },
    {
        "name": "skills",
        "priority": {
            "A": {
                "skills": 46,
                "skill groups": 10
            },
            "B": {
                "skills": 36,
                "skill groups": 5
            },
            "C": {
                "skills": 28,
                "skill groups": 2
            },
            "D": {
                "skills": 22,
                "skill groups": 0
            },
            "E": {
                "skills": 18,
                "skill groups": 0
            }
        }
    },
    {
        "name": "resources",
        "priority": {
            "A": 450000,
            "B": 275000,
            "C": 140000,
            "D": 50000,
            "E": 6000
        }
    }
]
