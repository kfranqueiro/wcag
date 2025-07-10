export default function (data) {
  return {
    headerLabel: "Understanding Docs",
    headerUrl: data.understandingUrl,
    isUnderstanding: true,
    associations: {
      "non-text-content": {
        // 1.1.1
        sufficient: [
          {
            title:
              "Situation A: If a short description can serve the same purpose and present the same information as the non-text content:",
            techniques: [
              {
                id: "G94",
                using: ["text-equiv-all-situation-a-shorttext"],
              },
            ],
            groups: [
              {
                id: "text-equiv-all-situation-a-shorttext",
                title: "Short text alternative techniques for Situation A",
                techniques: ["ARIA6", "ARIA10", "G196", "H2", "H37", "H53", "H86", "PDF1"],
              },
            ],
          },
          {
            title:
              "Situation B: If a short description can not serve the same purpose and present the same information as the non-text content (e.g., a chart or diagram):",
            techniques: [
              {
                id: "G95",
                using: [
                  "text-equiv-all-situation-b-shorttext",
                  "text-equiv-all-situation-b-longtext",
                ],
              },
            ],
            groups: [
              {
                id: "text-equiv-all-situation-b-shorttext",
                title: "Short text alternative techniques for Situation B",
                techniques: ["ARIA6", "ARIA10", "G196", "H2", "H37", "H53", "H86", "PDF1"],
              },
              {
                id: "text-equiv-all-situation-b-longtext",
                title: "Long text alternative techniques for Situation B",
                techniques: ["ARIA15", "G73", "G74", "G92", "H53"],
              },
            ],
          },
          {
            title: "Situation C: If non-text content is a control or accepts user input:",
            techniques: [
              {
                id: "G82",
                using: ["text-equiv-all-situation-c-controls"],
              },
            ],
            groups: [
              {
                id: "text-equiv-all-situation-c-controls",
                title: "Text alternative techniques for controls and input for Situation C:",
                techniques: ["ARIA6", "ARIA9", "H24", "H30", "H36", "H44", "H65"],
              },
            ],
          },
          {
            title:
              "Situation D: If non-text content is time-based media (including live video-only and live audio-only); a test or exercise that would be invalid if presented in text; or primarily intended to create a specific sensory experience",
            techniques: [
              {
                title: "Providing a descriptive label",
                using: ["text-equiv-all-situation-d-shorttext"],
              },
            ],
            groups: [
              {
                id: "text-equiv-all-situation-d-shorttext",
                title: "Short text alternative techniques for Situation D",
                techniques: ["ARIA6", "ARIA10", "G196", "H2", "H37", "H53", "H86", "PDF1"],
              },
            ],
          },
          {
            title: "Situation E: If non-text content is a CAPTCHA:",
            techniques: [{ and: ["G143", "G144"] }],
          },
          {
            title:
              "Situation F: If the non-text content should be ignored by assistive technology:",
            techniques: [
              {
                title:
                  "Implementing or marking the non-text content so that it will be ignored by assistive technology",
                using: ["text-equiv-all-situation-f-notrequired"],
              },
            ],
            groups: [
              {
                id: "text-equiv-all-situation-f-notrequired",
                techniques: ["C9", "H67", "PDF4"],
              },
            ],
          },
        ],
        advisory: ["C18"],
        failures: ["F3", "F13", "F20", "F30", "F38", "F39", "F65", "F67", "F71", "F72"],
      },

      "audio-only-and-video-only-prerecorded": {
        // 1.2.1
        sufficient: [
          {
            title: "Situation A: If the content is prerecorded audio-only:",
            techniques: ["G158"],
          },
          {
            title: "Situation B: If the content is prerecorded video-only:",
            techniques: ["G159", "G166"],
          },
        ],
        advisory: ["H96"],
        failures: ["F30", "F67"],
      },

      captions: {
        // 1.2.2
        sufficient: [
          "G93",
          {
            id: "G87",
            title:
              "<G87> using any readily available media format that has a video player that supports closed captioning",
          },
          {
            id: "G87",
            using: ["SM11", "SM12", "H95"],
            usingQuantity: "any",
          },
        ],
        failures: ["F8", "F75", "F74"],
      },

      "audio-description-or-media-alternative-prerecorded": {
        // 1.2.3
        sufficient: [
          { id: "G69", using: ["G58"] },
          {
            title:
              "Linking to the alternative for time-based media using one of the following techniques",
            using: ["H53"],
          },
          "G78",
          {
            id: "G173",
            using: ["SM6", "SM7", "G226", "Using any player that supports audio and video"],
          },
          {
            id: "G8",
            using: ["SM1", "SM2", "Using any player that supports audio and video"],
          },
          "G203",
        ],
        advisory: ["H96"],
      },

      "captions-live": {
        // 1.2.4
        sufficient: [
          { and: ["G9", "G93"] },
          {
            and: ["G9", "G87"],
            using:
              "any readily available media format that has a video player that supports closed captioning",
          },
          {
            and: ["G9", "G87"],
            using: ["SM11", "SM12"],
          },
        ],
      },

      "audio-description-prerecorded": {
        // 1.2.5
        sufficient: [
          "G78",
          {
            id: "G173",
            using: ["SM6", "SM7", "G226", "Using any player that supports audio and video"],
          },
          {
            id: "G8",
            using: ["SM1", "SM2", "Using any player that supports audio and video"],
          },
          "G203",
        ],
        advisory: ["H96"],
        failures: ["F113"],
      },

      "sign-language-prerecorded": {
        // 1.2.6
        sufficient: [
          "G54",
          {
            id: "G81",
            using: ["SM13", "SM14"],
          },
        ],
      },

      "extended-audio-description-prerecorded": {
        // 1.2.7
        sufficient: [
          {
            id: "G8",
            using: ["SM1", "SM2", "Using any player that supports audio and video"],
          },
        ],
        advisory: ["H96"],
      },

      "media-alternative-prerecorded": {
        // 1.2.8
        sufficient: [
          {
            title: "Situation A: If the content is prerecorded synchronized media:",
            techniques: [
              {
                id: "G69",
                using: ["G58"],
              },
              {
                title: "Linking to the alternative for time-based media",
                using: ["H53"],
              },
            ],
          },
          {
            title: "Situation B: If the content is prerecorded video-only:",
            techniques: ["G159"],
          },
        ],
        failures: ["F74"],
      },

      "audio-only-live": {
        // 1.2.9
        sufficient: ["G151", "G150", "G157"],
      },

      "info-and-relationships": {
        // 1.3.1
        sufficient: [
          {
            title:
              "Situation A: The technology provides semantic structure to make information and relationships conveyed through presentation programmatically determinable:",
            techniques: [
              "ARIA11",
              "H101",
              "ARIA12",
              "ARIA13",
              "ARIA16",
              "ARIA17",
              "ARIA20",
              { and: ["G115", "H49"] },
              "G117",
              "G140",
              "ARIA24",
              {
                title:
                  "Making information and relationships conveyed through presentation programmatically determinable",
                using: [
                  "G138",
                  "H51",
                  "PDF6",
                  "PDF20",
                  "H39",
                  "H63",
                  "H43",
                  "H44",
                  "H65",
                  "PDF10",
                  "PDF12",
                  "H71",
                  "H85",
                  "H48",
                  "H42",
                  "PDF9",
                  "PDF11",
                  "PDF17",
                  "PDF21",
                  "H97",
                ],
              },
            ],
          },
          {
            title:
              "Situation B: The technology in use does NOT provide the semantic structure to make the information and relationships conveyed through presentation programmatically determinable:",
            techniques: [
              "G117",
              {
                title:
                  "Making information and relationships conveyed through presentation programmatically determinable or available in text",
                using: ["T1", "T2", "T3"],
              },
            ],
          },
        ],
        advisory: ["C22", "G162", "ARIA1", "ARIA2", "G141"],
        failures: ["F2", "F33", "F34", "F42", "F43", "F46", "F48", "F90", "F91", "F92", "F111"],
      },

      "meaningful-sequence": {
        // 1.3.2
        sufficient: [
          {
            id: "G57",
            title: "<G57> for all the content in the web page",
          },
          {
            title: "Marking sequences in the content as meaningful",
            using: ["H34", "H56", "C6", "C8"],
            usingAnd: [
              {
                id: "G57",
                title: "<G57> for those sequences",
              },
            ],
          },
          "C27",
          "PDF3",
        ],
        failures: ["F34", "F33", "F32", "F49", "F1"],
      },

      "sensory-characteristics": {
        // 1.3.3
        sufficient: ["G96"],
        failures: ["F14", "F26"],
      },

      orientation: {
        // 1.3.4
        sufficient: ["G214"],
        failures: ["F97", "F100"],
      },

      "identify-input-purpose": {
        // 1.3.5
        sufficient: ["H98"],
        failures: ["F107"],
      },

      "identify-purpose": {
        // 1.3.6
        sufficient: [
          "Programmatically indicating the purpose of icons, regions and user interface components",
          "ARIA11",
          "Using microdata to markup user interface components (future link)",
        ],
        advisory: [
          "Enabling user agents to find the version of the content that best fits their needs",
          'Using semantics to identify important features (e.g., <code>coga-simplification="simplest"</code>)',
          "Using <code>aria-invalid</code> and <code>aria-required</code>",
        ],
      },

      "use-of-color": {
        // 1.4.1
        sufficient: [
          {
            title:
              "Situation A: If the color of particular words, backgrounds, or other content is used to indicate information:",
            techniques: ["G14", "G205", "G182", "G183"],
          },
          {
            title: "Situation B: If color is used within an image to convey information:",
            techniques: ["G111", "G14"],
          },
        ],
        advisory: ["C15"],
        failures: ["F13", "F73", "F81"],
      },

      "audio-control": {
        // 1.4.2
        sufficient: ["G60", "G170", "G171"],
        failures: ["F23", "F93"],
      },

      "contrast-minimum": {
        // 1.4.3
        sufficient: [
          {
            title:
              "Situation A: text is less than 18 point if not bold and less than 14 point if bold",
            techniques: ["G18", "G148", "G174"],
          },
          {
            title:
              "Situation B: text is at least 18 point if not bold and at least 14 point if bold",
            techniques: ["G145", "G148", "G174"],
          },
        ],
        advisory: ["G156"],
        failures: ["F24", "F83"],
      },

      "resize-text": {
        // 1.4.4
        sufficient: [
          "G142",
          {
            and: [
              "Ensuring that text containers resize when the text resizes",
              "using measurements that are relative to other measurements in the content",
            ],
            using: [
              "C28",
              {
                title: "Techniques for relative measurements",
                using: ["C12", "C13", "C14"],
                usingText: "", // (No "using ...", only child list)
              },
              {
                title: "Techniques for text container resizing",
                using: ["SCR34", "G146"],
                usingText: "", // (No "using ...", only child list)
              },
            ],
            usingQuantity: "one or more",
          },
          "G178",
          "G179",
        ],
        advisory: ["C17", "C20", "C22"],
        failures: ["F69", "F80", "F94"],
      },

      "images-of-text": {
        // 1.4.5
        sufficient: ["C22", "C30", "G140", "PDF7"],
        advisory: ["C12", "C13", "C14", "C8", "C6"],
      },

      "contrast-enhanced": {
        // 1.4.6
        sufficient: [
          {
            title:
              "Situation A: text is less than 18 point if not bold and less than 14 point if bold",
            techniques: ["G17", "G148", "G174"],
          },
          {
            title:
              "Situation B: text is as least 18 point if not bold and at least 14 point if bold",
            techniques: ["G18", "G148", "G174"],
          },
        ],
        advisory: ["G156"],
        failures: ["F24", "F83"],
      },

      "low-or-no-background-audio": {
        // 1.4.7
        sufficient: ["G56"],
      },

      "visual-presentation": {
        // 1.4.8
        sufficientIntro: `
          <strong>Instructions:</strong> Since this is a multi-part success criterion,
          you must satisfy one of the numbered items for each of the requirements below.
        `,
        sufficient: [
          {
            title:
              "First Requirement: Techniques to ensure foreground and background colors can be selected by the user",
            techniques: ["C23", "C25", "G156", "G148", "G175"],
          },
          {
            title:
              "Second Requirement: Techniques to ensure width is no more than 80 characters or glyphs (40 if CJK)",
            techniques: ["G204", "C20"],
          },
          {
            title:
              "Third Requirement: Techniques to ensure text is not justified (aligned to both the left and the right margins)",
            techniques: ["C19", "G172", "G169"],
          },
          {
            title:
              "Fourth Requirement: Techniques to ensure line spacing (leading) is at least space-and-a-half within paragraphs, and paragraph spacing is at least 1.5 times larger than the line spacing",
            techniques: ["G188", "C21"],
          },
          {
            title:
              "Fifth Requirement: Techniques to ensure text can be resized without assistive technology up to 200 percent in a way that does not require the user to scroll horizontally to read a line of text on a full-screen window",
            techniques: [
              "G204",
              {
                and: [
                  "G146",
                  "using measurements that are relative to other measurements in the content",
                ],
                using: ["C12", "C13", "C14", "C24", "SCR34"],
                usingQuantity: "one or more",
              },
              "G206",
            ],
          },
        ],
        failures: ["F24", "F88"],
      },

      "images-of-text-no-exception": {
        // 1.4.9
        sufficient: ["C22", "C30", "G140", "PDF7"],
        advisory: ["C12", "C13", "C14", "C8", "C6"],
      },

      reflow: {
        // 1.4.10
        sufficient: [
          "C32",
          "C31",
          "C33",
          "C38",
          "SCR34",
          "G206",
          "G224",
          "G225",
          "Using PDF/UA when creating PDFs (Potential future technique)",
        ],
        advisory: [
          "C34",
          "C37",
          "CSS, Reflowing simple data tables (Potential future technique)",
          "CSS, Fitting data cells within the width of the viewport (Potential future technique)",
          "Mechanism to allow mobile view at any time (Potential future technique)",
          "Alternate view supporting Reflow for otherwise excepted content (Potential future technique)",
        ],
        failures: ["F102"],
      },

      "non-text-contrast": {
        // 1.4.11
        sufficient: [
          {
            title:
              "Situation A: Color is used to identify user interface components or used to identify user interface component states",
            techniques: ["G195", "G174"],
          },
          {
            title: "Situation B: Color is required to understand graphical content",
            techniques: ["G207", "G209"],
          },
        ],
        failures: ["F78"],
      },

      "text-spacing": {
        // 1.4.12
        sufficient: ["C36", "C35"],
        advisory: ["C8", "C21", "C28"],
        failures: ["F104"],
      },

      "content-on-hover-or-focus": {
        // 1.4.13
        sufficient: [
          "SCR39",
          'ARIA: Using role="tooltip" (Potential future technique)',
          "CSS: Using hover and focus pseudo classes (Potential future technique)",
        ],
        failures: [
          "F95",
          "Failure to make content dismissible without moving pointer hover or keyboard focus (Potential future technique)",
          "Failure to meet by content on hover or focus not remaining visible until dismissed or invalid (Potential future technique)",
        ],
      },

      keyboard: {
        // 2.1.1
        sufficient: [
          "G202",
          {
            title: "Ensuring keyboard control",
            using: ["H91", "PDF3", "PDF11", "PDF23"],
          },
          {
            id: "G90",
            using: ["SCR20", "SCR35", "SCR2"],
          },
        ],
        advisory: [
          {
            and: [
              "Using WAI-ARIA role, state, and value attributes if repurposing static elements as interactive user interface components (future link)",
              "SCR29",
            ],
          },
        ],
        failures: ["F54", "F55", "F42"],
      },

      "no-keyboard-trap": {
        // 2.1.2
        sufficient: ["G21"],
        failures: ["F10"],
      },

      "keyboard-no-exception": {
        // 2.1.3 (contains a note in its page to consult 2.1.1: Keyboard for Sufficient Techniques)
      },

      "character-key-shortcuts": {
        // 2.1.4
        sufficient: ["G217"],
        failures: ["F99"],
      },

      "timing-adjustable": {
        // 2.2.1
        sufficient: [
          {
            title: "Situation A: If there are session time limits:",
            techniques: ["G133", "G198"],
          },
          {
            title: "Situation B: If a time limit is controlled by a script on the page:",
            techniques: ["G198", "G180", "SCR16"],
          },
          {
            title: "Situation C: If there are time limits on reading:",
            techniques: ["G4", "G198", "SCR33", "SCR36"],
          },
        ],
        failures: ["F40", "F41", "F58"],
      },

      "pause-stop-hide": {
        // 2.2.2
        sufficient: ["G4", "SCR33", "G11", "G152", "SCR22", "G186", "G191"],
        failures: ["F16", "F112", "F50", "F7"],
      },

      "no-timing": {
        // 2.2.3
        sufficient: ["G5"],
      },

      interruptions: {
        // 2.2.4
        sufficient: ["G75", "G76", "SCR14"],
        failures: ["F40", "F41"],
      },

      "re-authenticating": {
        // 2.2.5
        sufficient: [
          {
            title: "Providing options to continue without loss of data",
            using: ["G105", "G181"],
          },
        ],
        sufficientNote: `
          Refer to <a href="timing-adjustable#techniques">Techniques for Addressing Success Criterion 2.2.1</a>
          for techniques related to providing notifications about time limits.
        `,
      },
      failures: ["F12"],
    },

    timeouts: {
      // 2.2.6
      sufficient: [
        "Setting a session timeout to occur following at least 20 hours of inactivity",
        "Storing user data for more than 20 hours",
        "Providing a warning of the duration of user inactivity at the start of a process",
      ],
    },

    "three-flashes-or-below-threshold": {
      // 2.3.1
      sufficient: ["G19", "G176", "G15"],
    },

    "three-flashes": {
      // 2.3.2
      sufficient: ["G19"],
    },

    "animation-from-interactions": {
      // 2.3.3
      sufficient: ["C39", "Gx: Allowing users to set a preference that prevents animation"],
    },

    "bypass-blocks": {
      // 2.4.1
      sufficient: [
        {
          title: "Creating links to skip blocks of repeated material",
          using: ["G1", "G123", "G124"],
        },
        {
          title: "Grouping blocks of repeated material in a way that can be skipped,",
          using: ["ARIA11", "H69", "PDF9", "H64", "SCR28"],
        },
      ],
      advisory: ["C6", "H97"],
    },

    "page-titled": {
      // 2.4.2
      sufficient: [
        {
          and: ["G88", "associating a title with a web page"],
          using: ["H25", "PDF18"],
        },
      ],
      advisory: ["G127"],
      failures: ["F25"],
    },

    "focus-order": {
      // 2.4.3
      sufficient: [
        "G59",
        {
          title:
            "Giving focus to elements in an order that follows sequences and relationships within the content",
          using: ["C27", "PDF3"],
        },
        {
          title: "Changing a web page dynamically",
          using: ["SCR26", "H102", "SCR27"],
        },
      ],
      failures: ["F44", "F85"],
    },

    "link-purpose-in-context": {
      // 2.4.4
      sufficient: [
        "G91",
        "H30",
        "H24",
        {
          title: "Allowing the user to choose short or long link text",
          using: ["G189", "SCR30"],
        },
        "G153",
        {
          title: "Providing a supplemental description of the purpose of a link",
          using: ["H33", "C7"],
        },
        {
          title:
            "Identifying the purpose of a link using link text combined with programmatically determined link context",
          using: ["ARIA7", "ARIA8", "H77", "H78", "H79", "H81"],
        },
        { and: ["G91", "semantically indicating links"], using: ["PDF11", "PDF13"] },
      ],
      advisory: ["H2", "H80"],
      failures: ["F63", "F89"],
    },

    "multiple-ways": {
      // 2.4.5
      sufficient: [
        {
          using: ["G125", "G64", "G63", "G161", "G126", "G185"],
          usingQuantity: "two or more",
        },
      ],
      advisory: ["PDF2"],
    },

    "headings-and-labels": {
      // 2.4.6
      sufficient: ["G130", "G131"],
      sufficientNote: `
        Headings and labels must be programmatically determined,
        per <a href="info-and-relationships">Success Criterion 1.3.1</a>.
      `,
    },

    "focus-visible": {
      // 2.4.7
      sufficient: ["G149", "C15", "G165", "G195", "C40", "C45", "SCR31"],
      failures: ["F55", "F78"],
    },

    location: {
      // 2.4.8
      sufficient: ["G65", "G63", "G128", "G127"],
      advisory: ["PDF14", "PDF17"],
    },

    "link-purpose-link-only": {
      // 2.4.9
      sufficient: [
        "ARIA8",
        "G91",
        "H30",
        "H24",
        {
          title: "Allowing the user to choose short or long link text",
          using: ["G189", "SCR30"],
        },
        {
          title: "Providing a supplemental description of the purpose of a link",
          using: ["C7"],
        },
        {
          title: "Semantically indicating links",
          using: ["PDF11", "PDF13"],
        },
      ],
      advisory: ["H2", "H33"],
      failures: ["F84", "F89"],
    },

    "section-headings": {
      // 2.4.10
      sufficient: ["G41", "H69"],
    },

    "focus-not-obscured-minimum": {
      // 2.4.11
      sufficient: ["C43"],
      failures: ["F110"],
    },

    "focus-not-obscured-enhanced": {
      // 2.4.12
      sufficient: ["C43"],
      failures: [
        "An interaction that causes content to appear over the component with keyboard focus, visually covering part of the focus indicator. This behavior might be encountered with advertising or promotional material meant to provide more information about a product as the user navigates through a catalogue.",
        'A page has a sticky footer (attached to the bottom of the viewport). When tabbing down the page, a focused item is partially obscured by the footer because content in the viewport scrolls without sufficient <a href="https://www.w3.org/TR/css-scroll-snap/#propdef-scroll-padding" rel="nofollow">scroll padding</a>.',
      ],
    },

    "focus-appearance": {
      // 2.4.13
      sufficient: ["G195", "C40", "C41"],
      failures: ["F55", "F78"],
    },

    "pointer-gestures": {
      // 2.5.1
      sufficient: ["G215", "G216"],
      failures: ["F105"],
    },

    "pointer-cancellation": {
      // 2.5.2
      sufficient: [
        "G210",
        "G212",
        "Touch events are only triggered when touch is removed from a control (Potential future technique)",
      ],
      failures: ["F101"],
    },

    "label-in-name": {
      // 2.5.3
      sufficient: ["G208", "G211"],
      advisory: [
        "G162",
        "If an icon has no accompanying text, consider using its hover text as its accessible name (Potential future technique)",
      ],
      failures: [
        "F96",
        "F111",
        "Accessible name contains the visible label text, but the words of the visible label are not in the same order as they are in the visible label text (Potential future technique)",
        "Accessible name contains the visible label text, but one or more other words are interspersed in the label (Potential future technique)",
      ],
    },

    "motion-actuation": {
      // 2.5.4
      sufficient: [
        "G213",
        "GXXX: Supporting system level features which allow the user to disable motion actuation",
      ],
      failures: [
        "F106",
        "FXXX: Failure of Success Criterion 2.5.4 due to disrupting or disabling system level features which allow the user to disable motion actuation",
      ],
    },

    "target-size-enhanced": {
      // 2.5.5
      sufficient: ["Ensuring that targets are at least 44 by 44 CSS pixels"],
      advisory: ["Ensuring inline links provide sufficiently large activation target"],
      failures: [
        "Failure of Success Criterion 2.5.5 due to target being less than 44 by 44 CSS pixels",
      ],
    },

    "concurrent-input-mechanisms": {
      // 2.5.6
      sufficient: [
        "Only using high-level, input-agnostic event handlers, such as <code>focus</code>, <code>blur</code>, <code>click</code>, in Javascript (Potential future technique)",
        'Registering event handlers for keyboard/keyboard-like and pointer inputs simultaneously in Javascript; see <a href="https://www.w3.org/TR/pointerevents2/#example_1">Example 1 in Pointer Events Level 2</a> (Potential future technique)',
      ],
      failures: ["F98"],
    },

    "dragging-movements": {
      // 2.5.7
      sufficient: ["G219"],
      failures: ["F108"],
    },

    "target-size-minimum": {
      // 2.5.8
      sufficient: ["C42"],
    },

    "language-of-page": {
      // 3.1.1
      sufficient: ["H57", "PDF16", "PDF19"],
      advisory: ["SVR5"],
    },

    "language-of-parts": {
      // 3.1.2
      sufficient: ["H58", "PDF19"],
    },

    "unusual-words": {
      // 3.1.3
      sufficient: [
        {
          title: "Situation A: If the word or phrase has a unique meaning within the web page:",
          techniques: [
            {
              id: "G101",
              using: [
                { id: "G55", using: ["H40"] },
                { id: "G112", using: ["H54"] },
              ],
              usingText:
                "for the first occurrence of the word or phrase in a web page using one of the following techniques:",
            },
            {
              id: "G101",
              using: [
                {
                  id: "G55",
                  using: ["H40"],
                },
                "G62",
                "G70",
              ],
              usingText:
                "for each occurrence of the word or phrase in a web page using one of the following techniques:",
            },
          ],
        },
        {
          title:
            "Situation B: If the word or phrase means different things within the same web page:",
          techniques: [
            {
              id: "G101",
              using: [
                { id: "G55", using: ["H40"] },
                { id: "G112", using: ["H54"] },
              ],
              usingText:
                "for each occurrence of the word or phrase in a web page using one of the following techniques:",
            },
          ],
        },
      ],
    },

    abbreviations: {
      // 3.1.4
      sufficient: [
        {
          title: "Situation A: If the abbreviation has only one meaning within the web page:",
          techniques: [
            {
              id: "G102",
              using: ["G97", "G55", "PDF8"],
              usingText:
                "for the first occurrence of the abbreviation in a web page using one of the following techniques:",
            },
            {
              id: "G102",
              using: ["G55", "G62", "G70", "PDF8"],
              usingText:
                "for all occurrences of the abbreviation in a web page using one of the following techniques:",
            },
          ],
        },
        {
          title:
            "Situation B: If the abbreviation means different things within the same web page:",
          techniques: [
            {
              id: "G102",
              using: ["G55", "PDF8"],
              usingText:
                "for all occurrences of abbreviations in a web page using one of the following techniques:",
            },
          ],
        },
      ],
      advisory: ["H28"],
    },

    "reading-level": {
      // 3.1.5
      sufficient: ["G86", "G103", "G79", "G153", "G160"],
      sufficientNote: `
        Different sites may address this success criterion in different ways.
        An audio version of the content may be helpful to some users.
        For some people who are deaf, a sign language version of the page may be
        easier to understand than a written language version since sign language may be their first language.
        Some sites may decide to do both or other combinations.
        No technique will help all users who have difficulty.
        So different techniques are provided as sufficient techniques here for authors trying to make their sites more accessible.
        Any numbered technique or combination above can be used by a particular site and it is considered sufficient by the Working Group.
      `,
    },

    pronunciation: {
      // 3.1.6
      sufficient: ["G120", "G121", "G62", "G163", "H62"],
    },

    "on-focus": {
      // 3.2.1
      sufficient: ["G107"],
      sufficientNote: `
        A change of content is not always a <a>change of context</a>.
        This success criterion is automatically met if changes in content are not also changes of context.
      `,
      advisory: ["G200", "G201"],
      failures: ["F55"],
    },

    "on-input": {
      // 3.2.2
      sufficient: [
        {
          id: "G80",
          using: ["H32", "H84", "PDF15"],
        },
        "G13",
        "SCR19",
      ],
      sufficientNote: `
        A change of content is not always a <a>change of context</a>.
        This success criterion is automatically met if changes in content are not also changes of context.
      `,
      advisory: ["G201"],
      failures: ["F36", "F37"],
    },

    "consistent-navigation": {
      // 3.2.3
      sufficient: ["G61"],
      advisory: ["PDF14", "PDF17"],
      failures: ["F66"],
    },

    "consistent-identification": {
      // 3.2.4
      sufficient: [
        {
          and: [
            "G197",
            'following the <a href="non-text-content#techniques">sufficient techniques for Success Criterion 1.1.1</a> and <a href="name-role-value#techniques">sufficient techniques for Success Criterion 4.1.2</a> for providing labels, names, and text alternatives',
          ],
        },
      ],
      sufficientNote: `
        <p>
          Text alternatives that are "consistent" are not always "identical."
          For instance, you may have a graphical arrow at the bottom of a web page that
          links to the next web page. The text alternative may say "Go to page 4."
          Naturally, it would not be appropriate to repeat this exact text alternative on the next web page.
          It would be more appropriate to say "Go to page 5". Although these text alternatives
          would not be identical, they would be consistent, and therefore would satisfy this success criterion.
        </p><p>
          A single non-text-content-item may be used to serve different functions.
          In such cases, different text alternatives are necessary and should be used.
          Examples can be commonly found with the use of icons such as check marks, cross marks, and traffic signs.
          Their functions can be different depending on the context of the web page.
          A check mark icon may function as "approved", "completed", or "included", to name a few, depending on the situation.
          Using "check mark" as text alternative across all web pages does not help users understand the function of the icon.
          Different text alternatives can be used when the same non-text content serves multiple functions.
        </p>
      `,
      failures: ["F31"],
    },

    "change-on-request": {
      // 3.2.5
      sufficient: [
        {
          title: "Situation A: If the web page allows automatic updates:",
          techniques: ["G76"],
        },
        {
          title: "Situation B: If automatic redirects are possible:",
          techniques: [
            "SVR1",
            {
              id: "G110",
              using: ["H76"],
            },
          ],
        },
        {
          title: "Situation C: If the web page uses pop-up windows:",
          techniques: [
            {
              title: "Including pop-up windows",
              using: ["H83", "SCR24"],
            },
          ],
        },
        {
          title: "Situation D: If using an onchange event on a select element:",
          techniques: ["SCR19"],
        },
      ],
      advisory: ["G200"],
      failures: ["F60", "F61", "F9", "F22", "F52", "F40", "F41"],
    },

    "consistent-help": {
      // 3.2.6
      sufficient: ["G220"],
      failures: ["Inconsistent Help Location"],
    },

    "error-identification": {
      // 3.3.1
      sufficient: [
        {
          title:
            "Situation A: If a form contains fields for which information from the user is mandatory.",
          techniques: ["G83", "ARIA2", "ARIA21", "SCR18", "PDF5"],
        },
        {
          title:
            "Situation B: If information provided by the user is required to be in a specific data format or of certain values.",
          techniques: ["ARIA18", "ARIA19", "ARIA21", "G84", "G85", "SCR18", "SCR32", "PDF22"],
        },
      ],
      advisory: ["G139", "G199"],
    },

    "labels-or-instructions": {
      // 3.3.2
      sufficient: [
        {
          id: "G131",
          using: ["ARIA1", "ARIA9", "ARIA17", "G89", "G184", "G162", "G83", "H90", "PDF5"],
          usingConjunction: "<strong>AND</strong>",
        },
        "H44",
        "PDF10",
        "H71",
        "G167",
      ],
      sufficientNote: `
        The techniques at the end of the above list should be considered "last resort" and
        only used when the other techniques cannot be applied to the page.
        The earlier techniques are preferred because they increase accessibility to a wider user group.
      `,
      advisory: ["G13"],
      failures: ["F82"],
    },

    "error-suggestion": {
      // 3.3.3
      sufficient: [
        {
          title:
            "Situation A: If information for a field is required to be in a specific data format:",
          techniques: ["ARIA18", "G85", "G177", "PDF22"],
        },
        {
          title:
            "Situation B: Information provided by the user is required to be one of a limited set of values:",
          techniques: ["ARIA18", "G84", "G177", "PDF22"],
        },
      ],
      advisory: ["G139", "G199", "SCR18", "SCR32"],
    },

    "error-prevention-legal-financial-data": {
      // 3.3.4
      sufficient: [
        {
          title:
            "Situation A: If an application causes a legal transaction to occur, such as making a purchase or submitting an income tax return:",
          techniques: ["G164", "G98", "G155"],
        },
        {
          title: "Situation B: If an action causes information to be deleted:",
          techniques: ["G99", "G168", "G155"],
        },
        {
          title: "Situation C: If the web page includes a testing application",
          techniques: ["G98", "G168"],
        },
      ],
      advisory: ["SCR18", "G199"],
    },

    help: {
      // 3.3.5
      sufficient: [
        {
          title: "Situation A: If a form requires text input:",
          techniques: ["G71", "G193", "G194", "G184"],
        },
        {
          title: "Situation B: If a form requires text input in an expected data format:",
          techniques: ["G89", "G184"],
        },
      ],
      advisory: ["H89"],
    },

    "error-prevention-all": {
      // 3.3.6
      sufficient: [
        'Following the <a href="error-prevention-legal-financial-data#techniques">sufficient techniques for Success Criterion 3.3.4</a> for all forms that require the user to submit information',
      ],
    },

    "redundant-entry": {
      // 3.3.7
      sufficient: [
        "G221",
        "Not requesting the same information twice (Potential future technique)",
      ],
    },

    "accessible-authentication-minimum": {
      // 3.3.8
      sufficient: [
        "G218",
        "H100",
        "Providing WebAuthn as an alternative to username/password (Potential future technique)",
        "Providing a third-party login using OAuth (Potential future technique)",
        "Using two techniques to provide two-factor authentication (Potential future technique)",
      ],
      failures: ["F109"],
    },

    "accessible-authentication-enhanced": {
      // 3.3.9
      sufficient: [
        "G218",
        "H100",
        "Providing WebAuthn as an alternative to username/password (Potential future technique)",
        "Providing a third-party login using OAuth (Potential future technique)",
        "Using two techniques to provide two-factor authentication (Potential future technique)",
      ],
      failures: ["F109"],
    },

    parsing: {
      // 4.1.1 (techniques not listed in 2.2)
      sufficient: [
        "G134",
        "G192",
        "H88",
        {
          title: "Ensuring that web pages can be parsed",
          using: ["H74", "H75"],
        },
      ],
      failures: ["F70", "F77"],
    },
    // TODO: check where else parsing-related techniques are referenced (I've been looking at 2.2 docs to populate this)

    "name-role-value": {
      // 4.1.2
      sufficient: [
        {
          title:
            "Situation A: If using a standard user interface component in a markup language (e.g., HTML):",
          techniques: [
            "ARIA14",
            "ARIA16",
            {
              id: "G108",
              using: ["H91", "H44", "H64", "H65", "H88"],
              usingQuantity: "one or more",
            },
          ],
        },
        {
          title:
            "Situation B: If using script or code to re-purpose a standard user interface component in a markup language:",
          techniques: [
            {
              title:
                "Exposing the names and roles, allowing user-settable properties to be directly set, and providing notification of changes",
              using: ["ARIA16"],
            },
          ],
        },
        {
          title:
            "Situation C: If using a standard user interface component in a programming technology:",
          techniques: [
            {
              id: "G135",
              using: ["PDF10", "PDF12"],
              usingQuantity: "one or more",
            },
          ],
        },
        {
          title:
            "Situation D: If creating your own user interface component in a programming language:",
          techniques: [
            {
              id: "G10",
              using: ["ARIA4", "ARIA5", "ARIA16"],
              usingQuantity: "one or more",
            },
          ],
        },
      ],
      failures: ["F59", "F15", "F20", "F42", "F68", "F79", "F86", "F89", "F111"],
    },

    "status-messages": {
      // 4.1.3
      sufficient: [
        {
          title:
            "Situation A: If a status message advises on the success or results of an action, or the state of an application:",
          techniques: [
            {
              id: "ARIA22",
              using: ["G199"],
              usingQuantity: "any",
              usingConjunction: "in combination with",
            },
          ],
        },
        {
          title:
            "Situation B: If a status message conveys a suggestion, or a warning on the existence of an error:",
          techniques: [
            {
              id: "ARIA19",
              using: ["G83", "G84", "G85", "G177", "G194"],
              usingQuantity: "any",
              usingConjunction: "in combination with",
            },
          ],
          note: 'Not all examples in the preceding general techniques use status messages to convey warnings or errors to users. A role of "alert" is only necessary where a change of context does not take place.',
        },
        {
          title:
            "Situation C: If a status message conveys information on the progress of a process:",
          techniques: ["ARIA23", 'Using <code>role="progressbar"</code> (future link)', "ARIA22"],
        },
      ],
      advisory: [
        "Using aria-live regions with chat clients (future link)",
        'Using aria-live regions to support <a href="content-on-hover-or-focus">1.4.13 Content on Hover or Focus</a> (future link)',
        'Using <code>role="marquee"</code> (future link)',
        'Using <code>role="timer"</code> (future link)',
        {
          id: "ARIA18",
          title: "Where appropriate, moving focus to new content with <ARIA18>",
        },
        {
          id: "SCR14",
          title: "Supporting personalization with <SCR14>",
        },
      ],
      failures: [
        "F103",
        'Using <code>role="alert"</code> or <code>aria-live="assertive"</code> on content which is not important and time-sensitive (future link)',
      ],
    },
  };
}
