export default {
    author_image_width: {
        value: {
            option_name: '32'
        },
        expected: {
            style_name: 'width',
            expected_value: '32px'
        }
    },
    color_gradient_default_expected: 'linear-gradient(rgb(43, 135, 218) 0%, rgb(41, 196, 169) 100%)',
    element_color_parent: {
        value: { colorNumber: 3 },
        expected: {
            style_name: 'color',
            expected_value: 'rgb(224, 43, 32)',
        }
    },
    icon_image_width: {
        value: {
            slide_value: 10,
        },
        expected: {
            style_name: 'width',
            expected_value: '34px',
        }
    },
    icon_size_parent: {
        value: {
            slide_value: 10,
        },
        expected: {
            style_name: 'font-size',
            expected_value: '22px',
        }
    },
    margin_parent: {
        value: '30',
        expected: {
            style_name: 'margin',
            expected_value: '30px'
        }
    },
    padding_parent: {
        value: '30',
        expected: {
            style_name: 'padding',
            expected_value: '30px'
        }
    },
    text_align_parent: {
        value: {
            select_number: 2
        },
        expected: {
            style_name: 'text-align',
            expected_value: 'right',
        }
    },
    text_align_child: {
        value: {
            select_number: 1
        },
        expected: {
            style_name: 'text-align',
            expected_value: 'center',
        }
    },
    font_family_parent: {
        value: {
            option_name: 'Abel',
            isItFont: true
        },
        expected: {
            style_name: 'font-family',
            expected_value: "Abel, Helvetica, Arial, Lucida, sans-serif"
        }
    },
    text_style_uppercase: {
        value: {
            select_number: 1, //uppercase
            isItFont: true,
        },
        expected: {
            style_name: 'text-transform',
            expected_value: 'uppercase'
        }
    },
    text_shadow_parent: {
        value: {
            select_number: 2,
            isItAnchor: true,
        },
        expected: {
            style_name: 'text-shadow',
            expected_value: 'rgba(0, 0, 0, 0.4) 1.52px 1.52px 1.52px'
        }
    },
    font_size_parent: {
        value: {
            slide_value: 5,
        },
        expected: {
            style_name: 'font-size',
            expected_value: '19px',
        }
    },
    letter_spacing_parent: {
        value: { slide_value: 4, },
        expected: {
            style_name: 'letter-spacing',
            expected_value: '4px',
        }
    },
    line_height_parent: {
        value: { slide_value: 3, },
        expected: {
            style_name: 'line-height',
            expected_value: '38px',
        }
    },
    bg_color_gradient_default_parent: {
        expected: {
            style_name: 'background-image',
            expected_value: 'linear-gradient(rgb(43, 135, 218) 0%, rgb(41, 196, 169) 100%)' //linear-gradient( 180deg, #2b87da 0%, #29c4a9 100% )

        }
    },

    bg_color_parent: {
        value: { colorNumber: 3 },
        expected: {
            style_name: 'background-color',
            expected_value: 'rgb(224, 43, 32)'
        },
        reset_expected: {
            style_name: 'background-color',
            expected_value: 'rgba(255, 255, 255, 0)'
        }
    }
}
