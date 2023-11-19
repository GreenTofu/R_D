/* eslint-disable global-require */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["nunito", "sans-serif"],
        inter: ['"inter"', "sans-serif"],
      },
      colors: {
        white: "#FFFFFF",
        black: "#000000",
        primary: {
          100: "#f1f5fe",
          150: "#dce6fb",
          200: "#c8d6f9",
          250: "#b3c7f7",
          300: "#9eb8f5",
          350: "#89a9f3",
          400: "#759af0",
          450: "#608bee",
          500: "#4b7bec",
          550: "#3067e9",
          600: "#1855e3",
          650: "#154ac7",
          700: "#1240ac",
          750: "#0f3690",
          800: "#0c2c75",
          850: "#092159",
          900: "#06173e",
          DEFAULT: "#4b7bec",
        },
        neutral: {
          100: "#fafafb",
          150: "#f8f9fa",
          200: "#f3f4f6",
          300: "#dee1e6",
          400: "#bcc1ca",
          500: "#9095a0",
          600: "#565e6c",
          700: "#323842",
          900: "#171a1f",
          DEFAULT: "#9095a0",
        },
        secondary: {
          100: "#fff9ee",
          150: "#fef0d9",
          200: "#fde8c3",
          250: "#fde0ae",
          300: "#fcd898",
          350: "#fccf83",
          400: "#fbc76d",
          450: "#fbbf58",
          500: "#fab740",
          550: "#f9aa20",
          600: "#f09a06",
          650: "#ce8505",
          700: "#ac6f04",
          750: "#8a5904",
          800: "#684303",
          850: "#462d02",
          900: "#241701",
          DEFAULT: "#fab740",
        },
        info: {
          100: "#f0f8fe",
          150: "#d4ebfd",
          200: "#b8defc",
          250: "#9cd2fa",
          300: "#80c5f9",
          350: "#64b8f8",
          400: "#48abf6",
          450: "#2c9ef5",
          500: "#1091f4",
          550: "#0b83df",
          600: "#0974c6",
          650: "#0865ad",
          700: "#075794",
          750: "#06487a",
          800: "#053961",
          850: "#032a48",
          900: "#021b2f",
          DEFAULT: "#1091f4",
        },
        warning: {
          100: "#fef8f1",
          150: "#fcecd9",
          200: "#fae0c2",
          250: "#f8d4aa",
          300: "#f6c892",
          350: "#f4bc7b",
          400: "#f2b063",
          450: "#f0a44c",
          500: "#ef9834",
          550: "#ec8917",
          600: "#d37911",
          650: "#b7680f",
          700: "#9a580c",
          750: "#7d470a",
          800: "#603708",
          850: "#432605",
          900: "#271603",
          DEFAULT: "#ef9834",
        },
        danger: {
          100: "#fef0f1",
          150: "#fdd7d8",
          200: "#fbbdbf",
          250: "#faa3a6",
          300: "#f8898d",
          350: "#f76f73",
          400: "#f5555a",
          450: "#f43b41",
          500: "#f22128",
          550: "#eb0e15",
          600: "#d20c13",
          650: "#b90b11",
          700: "#9f090e",
          750: "#86080c",
          800: "#6d060a",
          850: "#540508",
          900: "#3b0305",
          DEFAULT: "#f22128",
        },
        success: {
          100: "#eefdf3",
          150: "#d3f9e0",
          200: "#b8f5cd",
          250: "#9df2b9",
          300: "#82eea6",
          350: "#67ea93",
          400: "#4ce77f",
          450: "#31e36c",
          500: "#1dd75b",
          550: "#1ac052",
          600: "#17a948",
          650: "#14923e",
          700: "#117b34",
          750: "#0e642a",
          800: "#0a4d20",
          850: "#073517",
          900: "#041e0d",
          DEFAULT: "#1dd75b",
        },
        "color-1": {
          100: "#f5f9f5",
          150: "#e5f0e5",
          200: "#d5e7d5",
          250: "#c5ddc5",
          300: "#b6d4b4",
          350: "#a6cba4",
          400: "#96c294",
          450: "#86b884",
          500: "#75af73",
          550: "#62a460",
          600: "#569254",
          650: "#4a7e48",
          700: "#3f6b3d",
          750: "#335732",
          800: "#284327",
          850: "#1c301c",
          900: "#111c10",
          DEFAULT: "#75af73",
        },
        "color-2": {
          100: "#fff1f0",
          150: "#ffe4e2",
          200: "#ffd8d4",
          250: "#fecbc6",
          300: "#febeb8",
          350: "#feb1aa",
          400: "#fea59d",
          450: "#fe988f",
          500: "#fe8c81",
          550: "#fd6659",
          600: "#fd4130",
          650: "#fd1d08",
          700: "#da1402",
          750: "#b21002",
          800: "#8a0d01",
          850: "#620901",
          900: "#390501",
          DEFAULT: "#fe8c81",
        },
        "color-3": {
          100: "#fcf2fd",
          150: "#f9dff9",
          200: "#f5cdf5",
          250: "#f1baf2",
          300: "#eda7ee",
          350: "#e994eb",
          400: "#e582e7",
          450: "#e26fe4",
          500: "#de5ce0",
          550: "#d841db",
          600: "#d028d3",
          650: "#b523b8",
          700: "#9a1e9c",
          750: "#7f1981",
          800: "#641366",
          850: "#490e4a",
          900: "#2e092f",
          DEFAULT: "#de5ce0",
        },
      },
      extend: {
        fontSize: {
          t1: ["0.6875rem", "1.125rem"],
          t2: ["0.75rem", "1.25rem"],
          t3: ["0.875rem", "1.375rem"],
          t4: ["1rem", "1.625rem"],
          t5: ["1.125rem", "1.75rem"],
          t6: ["1.25rem", "1.875rem"],
          t7: ["1.5rem", "2.25rem"],
          t8: ["2rem", "3rem"],
          t9: ["2.5rem", "3.5rem"],
          t10: ["3rem", "4.25rem"],
        },
        spacing: {
          s0: "0.125rem",
          s1: "0.25rem",
          s2: "0.375rem",
          s3: "0.5rem",
          s4: "0.75rem",
          s5: "1rem",
          s6: "1.25rem",
          s7: "1.5rem",
          s8: "1.75rem",
          s9: "2rem",
          s10: "2.25rem",
          s11: "2.5rem",
          s12: "2.75rem",
          s13: "3rem",
          s14: "3.5rem",
          s15: "4rem",
          s16: "6rem",
          s17: "8rem",
          s18: "12rem",
          s19: "16rem",
          s20: "24rem",
        },
        fontFamily: {
          heading: "Lato",
          body: "Inter",
        },
        width: {
          Sz_NONE: "0rem",
          Sz0: "0.125rem",
          Sz1: "0.25rem",
          Sz2: "0.375rem",
          Sz3: "0.5rem",
          Sz4: "0.75rem",
          Sz5: "1rem",
          Sz6: "1.25rem",
          Sz7: "1.5rem",
          Sz8: "1.75rem",
          Sz9: "2rem",
          Sz10: "2.25rem",
          Sz11: "2.5rem",
          Sz12: "2.75rem",
          Sz13: "3rem",
          Sz14: "3.25rem",
          Sz15: "3.5rem",
          Sz16: "3.75rem",
          Sz17: "4rem",
          Sz18: "6rem",
          Sz19: "8rem",
          Sz20: "12rem",
          Sz21: "16rem",
          Sz22: "24rem",
          Sz23: "32rem",
          Sz24: "40rem",
          Sz25: "48rem",
          Sz26: "56rem",
          Sz27: "64rem",
        },
        height: {
          Sz_NONE: "0rem",
          Sz0: "0.125rem",
          Sz1: "0.25rem",
          Sz2: "0.375rem",
          Sz3: "0.5rem",
          Sz4: "0.75rem",
          Sz5: "1rem",
          Sz6: "1.25rem",
          Sz7: "1.5rem",
          Sz8: "1.75rem",
          Sz9: "2rem",
          Sz10: "2.25rem",
          Sz11: "2.5rem",
          Sz12: "2.75rem",
          Sz13: "3rem",
          Sz14: "3.25rem",
          Sz15: "3.5rem",
          Sz16: "3.75rem",
          Sz17: "4rem",
          Sz18: "6rem",
          Sz19: "8rem",
          Sz20: "12rem",
          Sz21: "16rem",
          Sz22: "24rem",
          Sz23: "32rem",
          Sz24: "40rem",
          Sz25: "48rem",
          Sz26: "56rem",
          Sz27: "64rem",
        },
        borderRadius: {
          xs: "0.125rem",
          s: "0.1875rem",
          m: "0.25rem",
          l: "0.375rem",
          xl: "0.5rem",
          "100-percent": "100%",
        },
        boxShadow: {
          xs: "0px 0px 1px rgba(23, 26, 31, 0.15), 0px 0px 2px rgba(23, 26, 31, 0.2)",
          s: "0px 2px 5px rgba(23, 26, 31, 0.17), 0px 0px 2px rgba(23, 26, 31, 0.2)",
          m: "0px 4px 9px rgba(23, 26, 31, 0.19), 0px 0px 2px rgba(23, 26, 31, 0.2)",
          l: "0px 8px 17px rgba(23, 26, 31, 0.23), 0px 0px 2px rgba(23, 26, 31, 0.2)",
          xl: "0px 17px 35px rgba(23, 26, 31, 0.32), 0px 0px 2px rgba(23, 26, 31, 0.2)",
        },
      },
    },
  },
  plugins: [require("daisyui")],
};