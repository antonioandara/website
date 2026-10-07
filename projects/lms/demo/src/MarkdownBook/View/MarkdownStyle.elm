module MarkdownBook.View.MarkdownStyle exposing (CodeStyle(..), HeadingStyle(..), ImageStyle(..), LinkStyle(..), ListStyle(..), QuoteStyle(..), Settings, TableStyle(..), default, headingColor, linkColor, quoteColor)

import Element
import MarkdownBook.View.Theme exposing (Palette)

type HeadingStyle
    = PlainHeading
    | UnderlinedHeading
    | AccentBarHeading


type LinkStyle
    = CleanLink
    | UnderlinedLink
    | HighlightedLink


type ListStyle
    = BulletList
    | DashList
    | ArrowList


type QuoteStyle
    = StripeQuote
    | PanelQuote
    | MinimalQuote


type TableStyle
    = GridTable
    | RowTable
    | SoftTable


type CodeStyle
    = TerminalCode
    | SoftCode
    | MinimalCode


type ImageStyle
    = CleanImage
    | FramedImage
    | EditorialImage


type alias Settings =
    { paragraphSize : Float
    , lineHeight : Float
    , contentGap : Float
    , h1Size : Float
    , h2Size : Float
    , h3Size : Float
    , headingTracking : Float
    , headingTopSpace : Float
    , headingStyle : HeadingStyle
    , linkStyle : LinkStyle
    , listStyle : ListStyle
    , quoteStyle : QuoteStyle
    , tableStyle : TableStyle
    , codeStyle : CodeStyle
    , imageStyle : ImageStyle
    , tablePadding : Float
    , codeRadius : Float
    , imageRadius : Float
    , dividerThickness : Float
    }


default : Settings
default =
    { paragraphSize = 18
    , lineHeight = 1.75
    , contentGap = 24
    , h1Size = 36
    , h2Size = 28
    , h3Size = 23
    , headingTracking = 0
    , headingTopSpace = 14
    , headingStyle = PlainHeading
    , linkStyle = UnderlinedLink
    , listStyle = BulletList
    , quoteStyle = StripeQuote
    , tableStyle = RowTable
    , codeStyle = TerminalCode
    , imageStyle = CleanImage
    , tablePadding = 11
    , codeRadius = 0
    , imageRadius = 0
    , dividerThickness = 1
    }


headingColor : Palette -> Settings -> Element.Color
headingColor colors _ = colors.ink

linkColor : Palette -> Settings -> Element.Color
linkColor colors _ = colors.accent

quoteColor : Palette -> Settings -> Element.Color
quoteColor colors _ = colors.muted
