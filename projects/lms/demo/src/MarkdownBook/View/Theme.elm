module MarkdownBook.View.Theme exposing (Palette, ChoiceStyle(..), ComponentStyle, PanelStyle(..), Theme(..), ThemeInfo, Typography, syntaxTheme, themeInfo)

import Element exposing (Color)
import SyntaxHighlight


type Theme = NocturneFieldnotes | FieldnotesLight


type PanelStyle
    = NakedPanel
    | Borderless
    | SoftPanel
    | OutlinedPanel


type ChoiceStyle
    = SoftChoice
    | OutlinedChoice
    | MinimalChoice


type alias ComponentStyle =
    { panelStyle : PanelStyle
    , choiceStyle : ChoiceStyle
    , cornerRadius : Int
    }


type alias Palette =
    { paper : Color
    , white : Color
    , sidebar : Color
    , hover : Color
    , ink : Color
    , muted : Color
    , line : Color
    , transparent : Color
    , accent : Color
    , accentSoft : Color
    , success : Color
    , successSoft : Color
    , warning : Color
    , danger : Color
    , dangerSoft : Color
    , code : Color
    , codeText : Color
    , codeInline : Color
    }


type alias Typography =
    { bodyFont : String
    , displayFont : String
    , bodySize : Int
    , titleSize : Int
    , headingSize : Int
    , titleTracking : Float
    , contentSpacing : Int
    , sectionSpacing : Int
    , readerWidth : Int
    , pagePadding : Int
    , sidebarWidth : Int
    , lineHeight : Float
    }


type alias ThemeInfo =
    { theme : Theme
    , label : String
    , description : String
    , palette : Palette
    , typography : Typography
    , componentStyle : ComponentStyle
    }


themeInfo : Theme -> ThemeInfo
themeInfo theme =
    let
        dark =
            { theme = NocturneFieldnotes
            , label = "Nocturne Fieldnotes"
            , description = "Antonio Andara’s night field manual: charcoal paper, pale blue annotations, serif type, and precise ruled panels."
            , palette =
                { paper = Element.rgb255 17 23 28
                , white = Element.rgb255 20 30 39
                , sidebar = Element.rgb255 13 18 22
                , hover = Element.rgb255 23 35 46
                , ink = Element.rgb255 229 232 232
                , muted = Element.rgb255 156 170 180
                , line = Element.rgb255 43 57 68
                , transparent = Element.rgba 0 0 0 0
                , accent = Element.rgb255 142 189 255
                , accentSoft = Element.rgb255 34 56 78
                , success = Element.rgb255 143 203 173
                , successSoft = Element.rgb255 27 51 43
                , warning = Element.rgb255 225 190 128
                , danger = Element.rgb255 236 155 147
                , dangerSoft = Element.rgb255 62 36 38
                , code = Element.rgb255 13 18 22
                , codeText = Element.rgb255 192 201 207
                , codeInline = Element.rgb255 23 35 46
                }
            , typography =
                { bodyFont = "Libre Baskerville"
                , displayFont = "Libre Baskerville"
                , bodySize = 17
                , titleSize = 46
                , headingSize = 28
                , titleTracking = 0
                , contentSpacing = 28
                , sectionSpacing = 38
                , readerWidth = 820
                , pagePadding = 52
                , sidebarWidth = 280
                , lineHeight = 1.9
                }
            , componentStyle = { panelStyle = OutlinedPanel, choiceStyle = MinimalChoice, cornerRadius = 0 }
            }
        colors = dark.palette
        light =
            { colors
                | paper = Element.rgb255 251 250 244
                , white = Element.rgb255 241 244 245
                , sidebar = Element.rgb255 240 240 233
                , hover = Element.rgb255 235 239 241
                , ink = Element.rgb255 32 40 46
                , muted = Element.rgb255 89 103 114
                , line = Element.rgb255 203 211 215
                , accent = Element.rgb255 35 92 176
                , accentSoft = Element.rgb255 226 234 246
                , success = Element.rgb255 38 106 73
                , successSoft = Element.rgb255 227 239 229
                , warning = Element.rgb255 138 96 25
                , danger = Element.rgb255 161 53 46
                , dangerSoft = Element.rgb255 248 231 228
                , code = Element.rgb255 241 244 245
                , codeText = Element.rgb255 67 82 92
                , codeInline = Element.rgb255 235 239 241
            }
    in
    case theme of
        NocturneFieldnotes -> { dark | label = "Dark mode" }
        FieldnotesLight -> { dark | theme = FieldnotesLight, label = "Light mode", palette = light }


syntaxTheme : Theme -> SyntaxHighlight.Theme
syntaxTheme theme =
    case theme of
        NocturneFieldnotes -> SyntaxHighlight.oneDark
        FieldnotesLight -> SyntaxHighlight.gitHub
