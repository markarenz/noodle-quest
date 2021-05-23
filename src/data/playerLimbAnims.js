const playerLimbAnims = {
    limbs: {
        "stand_e_a_l_0": {
            from: "M 12,10 C 14,10 16,11 16,14",
            to: "M 12,10 C 14,9 16,10 16,13",
        },
        "stand_e_a_l_1": {
            from: "M 12,10 C 14,10 15,10 15,13",
            to: "M 12,10 C 14,9 15,9 15,12",
        },
        "stand_s_a_l_0": {
            from: "M 11,11 C 12,11 13,13 10,14",
            to: "M 11,11 C 12,10 13,12 10,13",
        },
        "stand_s_a_l_1": {
            from: "M 11,11 C 12,11 14,11 13,14",
            to: "M 11,11 C 12,10 14,10 13,13",
        },
        "stand_w_a_l_0": {
            from: "M 8,11 C 9,11 9,14 4,13",
            to: "M 8,11 C 9,10 9,13 4,12",
        },
        "stand_w_a_l_1": {
            from: "M 8,11 C 9,11 10,13 7,14",
            to: "M 8,11 C 9,10 10,12 7,13",
        },
        "stand_n_a_l_0": {
            from: "M 8,10 C 4,10 4,13 6,13",
            to: "M 8,10 C 4,9 4,12 6,12",
        },
        "stand_n_a_l_1": {
            from: "M 8,10 C 8,10 6,13 6,13",
            to: "M 8,10 C 8,9 6,12 6,12",
        },
        "stand_e_a_r_0": {
            from: "M 7.5,11 C 6,11 4,12 4, 15",
            to: "M 7.5,11 C 6,10 4,11 4, 14",
        },
        "stand_e_a_r_1": {
            from: "M 7,11 C 6,11 5,11 5, 16",
            to: "M 7,11 C 6,10 5,10 5, 15",
        },
        "stand_s_a_r_0": {
            from: "M 7.5,10 C 7,10 5,11 6,14",
            to: "M 7.5,10 C 7,9 5,10 6,13",
        },
        "stand_s_a_r_1": {
            from: "M 7.5,10 C 6,10 4,11 4,13",
            to: "M 7.5,10 C 6,9 4,10 4,12",
        },
        "stand_w_a_r_0": {
            from: "M 14,11 C 15,11 16,13 13,14",
            to: "M 14,11 C 15,10 16,12 13,13",
        },
        "stand_w_a_r_1": {
            from: "M 14,11 C 13,11 14,13 11,14",
            to: "M 14,11 C 13,10 14,12 11,13",
        },
        "stand_n_a_r_0": {
            from: "M 11,11 C 11,14 16,12 16,11",
            to: "M 11,11 C 11,13 16,11 16,10",
        },
        "stand_n_a_r_1": {
            from: "M 11,11 C 11,14 14,13 14,13",
            to: "M 11,11 C 11,13 14,12 14,12",
        },
        "stand_e_l_l_0": {
            from: "M 12,15 C 12,15 12,19 11,19",
            to: "M 12,15 C 12.5,15 12.5,19 11,19",
        },
        "stand_e_l_l_1": {
            from: "M 12,15 C 14,17 13,19 13,19",
            to: "M 12,15 C 14.5,17 13.5,19 13,19",
        },
        "stand_e_l_r_0": {
            from: "M 8,15 C 7,17 7,19 8,19",
            to: "M 8,15 C 6.5,17 6.5,19 8,19",
        },
        "stand_e_l_r_1": {
            from: "M 8,15 C 8,15 8,19 7,19",
            to: "M 8,15 C 8.5,15 8.5,19 7,19",
        },
    },
    feet: {
        "stand_f_l_0": {
            from: {
                cx: 11,
                cy: 19,
            },
            to: {
                cx: 11,
                cy: 19,
            },
        },
        "stand_f_l_1": {
            from: {
                cx: 13,
                cy: 19,
            },
            to: {
                cx: 13,
                cy: 19,
            },
        },
        "stand_f_r_0": {
            from: {
                cx: 8,
                cy: 19,
            },
            to: {
                cx: 8,
                cy: 19,
            },
        },
        "stand_f_r_1": {
            from: {
                cx: 7,
                cy: 19,
            },
            to: {
                cx: 7,
                cy: 19,
            },
        },
    },
    hands: {
        "stand_e_h_r_0": {
            from: {
                cx: 4,
                cy: 14,
            },
            to: {
                cx: 4,
                cy: 13,
            },
        },
        "stand_e_h_r_1": {
            from: {
                cx: 5,
                cy: 16,
            },
            to: {
                cx: 5,
                cy: 15,
            },
        },
        "stand_s_h_r_0": {
            from: {
                cx: 6,
                cy: 14,
            },
            to: {
                cx: 6,
                cy: 13,
            },
        },
        "stand_s_h_r_1": {
            from: {
                cx: 4,
                cy: 13,
            },
            to: {
                cx: 4,
                cy: 12,
            },
        },
        "stand_w_h_r_0": {
            from: {
                cx: 4,
                cy: 13,
            },
            to: {
                cx: 4,
                cy: 12,
            },
        },
        "stand_w_h_r_1": {
            from: {
                cx: 7,
                cy: 14,
            },
            to: {
                cx: 7,
                cy: 13,
            },
        },
        "stand_n_h_l_0": {
            from: {
                cx: 16,
                cy: 11,
            },
            to: {
                cx: 16,
                cy: 10,
            },
        },
        "stand_n_h_l_1": {
            from: {
                cx: 14,
                cy: 13,
            },
            to: {
                cx: 14,
                cy: 12,
            },
        },
        "stand_n_h_r_0": {
            from: {
                cx: 16,
                cy: 11,
            },
            to: {
                cx: 16,
                cy: 10,
            },
        },
        "stand_n_h_r_1": {
            from: {
                cx: 14,
                cy: 13,
            },
            to: {
                cx: 14,
                cy: 12,
            },
        },
        "stand_e_h_l_0": {
            from: {
                cx: 16,
                cy: 14,
            },
            to: {
                cx: 16,
                cy: 13,
            },
        },
        "stand_e_h_l_1": {
            from: {
                cx: 15,
                cy: 13,
            },
            to: {
                cx: 15,
                cy: 12,
            },
        },
        "stand_s_h_l_0": {
            from: {
                cx: 10,
                cy: 14,
            },
            to: {
                cx: 10,
                cy: 13,
            },
        },
        "stand_s_h_l_1": {
            from: {
                cx: 13,
                cy: 14,
            },
            to: {
                cx: 13,
                cy: 12,
            },
        },
        "stand_w_h_l_0": {
            from: {
                cx: 4,
                cy: 13,
            },
            to: {
                cx: 4,
                cy: 12,
            },
        },
        "stand_w_h_l_1": {
            from: {
                cx: 7,
                cy: 14,
            },
            to: {
                cx: 7,
                cy: 13,
            },
        },
    },
};

export default playerLimbAnims;
