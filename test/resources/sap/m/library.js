/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/i18n/Formatting","sap/ui/core/Lib","sap/ui/Device","sap/ui/base/DataType","sap/ui/base/EventProvider","sap/ui/core/Control","sap/base/util/ObjectPath","sap/ui/core/Locale","sap/ui/util/openWindow","sap/ui/core/library","sap/base/strings/capitalize","sap/ui/thirdparty/jquery","sap/base/assert","sap/base/Log","sap/base/util/defineLazyProperty","sap/base/security/encodeCSS","./AvatarShape","./AvatarSize","./AvatarType","./AvatarColor","./AvatarImageFitType","./IllustratedMessageSize","./IllustratedMessageType","./upload/UploaderHttpRequestMethod","sap/ui/core/theming/Parameters","sap/ui/core/LocaleData","./Support"],function(e,a,t,n,i,o,r,l,s,p,m,jQuery,u,c,d,g,S,T,f,A,y,C,h,I,P,b){"use strict";var v=a.init({name:"sap.m",version:"1.121.0",dependencies:["sap.ui.core"],designtime:"sap/m/designtime/library.designtime",types:["sap.m.AvatarImageFitType","sap.m.AvatarShape","sap.m.AvatarSize","sap.m.AvatarType","sap.m.AvatarColor","sap.m.BackgroundDesign","sap.m.BadgeState","sap.m.BadgeAnimationType","sap.m.BarDesign","sap.m.BorderDesign","sap.m.BreadcrumbsSeparatorStyle","sap.m.ButtonAccessibleRole","sap.m.ButtonType","sap.m.CarouselArrowsPlacement","sap.m.DateTimeInputType","sap.m.DeviationIndicator","sap.m.DialogRoleType","sap.m.DialogType","sap.m.DraftIndicatorState","sap.m.DynamicDateRangeGroups","sap.m.EmptyIndicatorMode","sap.m.FacetFilterListDataType","sap.m.FacetFilterType","sap.m.FilterPanelField","sap.m.FlexAlignContent","sap.m.FlexAlignItems","sap.m.FlexAlignSelf","sap.m.FlexDirection","sap.m.FlexJustifyContent","sap.m.FlexRendertype","sap.m.FlexWrap","sap.m.FrameType","sap.m.GenericTagDesign","sap.m.GenericTagValueState","sap.m.GenericTileMode","sap.m.Priority","sap.m.GenericTileScope","sap.m.HeaderLevel","sap.m.IBarHTMLTag","sap.m.IconTabDensityMode","sap.m.IconTabFilterDesign","sap.m.IconTabFilterInteractionMode","sap.m.IconTabHeaderMode","sap.m.IllustratedMessageSize","sap.m.IllustratedMessageType","sap.m.ImageMode","sap.m.InputTextFormatMode","sap.m.InputType","sap.m.LabelDesign","sap.m.LightBoxLoadingStates","sap.m.LinkConversion","sap.m.LinkAccessibleRole","sap.m.ListGrowingDirection","sap.m.ListHeaderDesign","sap.m.ListKeyboardMode","sap.m.ListMode","sap.m.ListSeparators","sap.m.ListType","sap.m.LoadState","sap.m.MenuButtonMode","sap.m.MultiSelectMode","sap.m.ObjectHeaderPictureShape","sap.m.ObjectMarkerType","sap.m.ObjectMarkerVisibility","sap.m.OverflowToolbarPriority","sap.m.P13nPanelType","sap.m.P13nConditionOperation","sap.m.PageBackgroundDesign","sap.m.PanelAccessibleRole","sap.m.PDFViewerDisplayType","sap.m.PlacementType","sap.m.PlanningCalendarBuiltInView","sap.m.PlanningCalendarStickyMode","sap.m.PopinDisplay","sap.m.PopinLayout","sap.m.QuickViewGroupElementType","sap.m.RatingIndicatorVisualMode","sap.m.ScreenSize","sap.m.CarouselScrollMode","sap.m.SelectColumnRatio","sap.m.SelectionDetailsActionLevel","sap.m.SelectListKeyboardNavigationMode","sap.m.SelectType","sap.m.Size","sap.m.SplitAppMode","sap.m.StandardDynamicDateRangeKeys","sap.m.StandardTileType","sap.m.StepInputStepModeType","sap.m.StepInputValidationMode","sap.m.Sticky","sap.m.StringFilterOperator","sap.m.SwipeDirection","sap.m.SwitchType","sap.m.TabsOverflowMode","sap.m.ContentConfigType","sap.m.TileSizeBehavior","sap.m.TimePickerMaskMode","sap.m.TitleAlignment","sap.m.TokenizerRenderMode","sap.m.ToolbarDesign","sap.m.ToolbarStyle","sap.m.UploadState","sap.m.UploadType","sap.m.ValueColor","sap.m.ValueCSSColor","sap.m.VerticalPlacementType","sap.m.WrappingType","sap.m.WizardRenderMode","sap.m.plugins.CopyPreference","sap.m.plugins.ContextMenuScope","sap.m.semantic.SemanticRuleSetType","sap.m.table.columnmenu.Category","sap.m.upload.UploaderHttpRequestMethod","sap.m.UploadSetwithTableActionPlaceHolder"],interfaces:["sap.m.IBar","sap.m.IBadge","sap.m.IBreadcrumbs","sap.m.ITableItem","sap.m.p13n.IContent","sap.m.IconTab","sap.m.IScale","sap.m.semantic.IGroup","sap.m.semantic.IFilter","sap.m.semantic.ISort","sap.m.ObjectHeaderContainer","sap.m.IOverflowToolbarContent","sap.m.IOverflowToolbarFlexibleContent","sap.m.IToolbarInteractiveControl","sap.m.IHyphenation"],controls:["sap.m.ActionListItem","sap.m.ActionSelect","sap.m.ActionSheet","sap.m.ActionTile","sap.m.ActionTileContent","sap.m.App","sap.m.Avatar","sap.m.Bar","sap.m.BusyDialog","sap.m.BusyIndicator","sap.m.Button","sap.m.Breadcrumbs","sap.m.Carousel","sap.m.CheckBox","sap.m.ColumnHeaderPopover","sap.m.ColumnListItem","sap.m.ColorPalette","sap.m.ColorPalettePopover","sap.m.ComboBox","sap.m.ComboBoxTextField","sap.m.ComboBoxBase","sap.m.TileAttribute","sap.m.CustomListItem","sap.m.CustomTile","sap.m.CustomTreeItem","sap.m.DatePicker","sap.m.DateRangeSelection","sap.m.DateTimeField","sap.m.DateTimeInput","sap.m.DateTimePicker","sap.m.Dialog","sap.m.DisplayListItem","sap.m.DraftIndicator","sap.m.DynamicDateRange","sap.m.ExpandableText","sap.m.AdditionalTextButton","sap.m.FacetFilter","sap.m.FacetFilterItem","sap.m.FacetFilterList","sap.m.FeedContent","sap.m.FeedInput","sap.m.FeedListItem","sap.m.FlexBox","sap.m.FormattedText","sap.m.GenericTag","sap.m.GenericTile","sap.m.GroupHeaderListItem","sap.m.GrowingList","sap.m.HBox","sap.m.HeaderContainer","sap.m.IconTabBar","sap.m.IconTabBarSelectList","sap.m.IconTabFilterExpandButtonBadge","sap.m.IconTabHeader","sap.m.IllustratedMessage","sap.m.Image","sap.m.ImageContent","sap.m.Input","sap.m.InputBase","sap.m.InputListItem","sap.m.Label","sap.m.LightBox","sap.m.Link","sap.m.List","sap.m.ListBase","sap.m.ListItemBase","sap.m.MaskInput","sap.m.Menu","sap.m.MenuButton","sap.m.MessagePage","sap.m.MessagePopover","sap.m.MessageView","sap.m.MessageStrip","sap.m.MultiComboBox","sap.m.MultiEditField","sap.m.MultiInput","sap.m.NavContainer","sap.m.NewsContent","sap.m.NumericContent","sap.m.NotificationList","sap.m.NotificationListBase","sap.m.NotificationListItem","sap.m.NotificationListGroup","sap.m.PagingButton","sap.m.PlanningCalendarLegend","sap.m.ObjectAttribute","sap.m.ObjectHeader","sap.m.ObjectIdentifier","sap.m.ObjectListItem","sap.m.ObjectMarker","sap.m.ObjectNumber","sap.m.ObjectStatus","sap.m.OverflowToolbar","sap.m.OverflowToolbarButton","sap.m.OverflowToolbarToggleButton","sap.m.OverflowToolbarMenuButton","sap.m.P13nColumnsPanel","sap.m.P13nGroupPanel","sap.m.P13nSelectionPanel","sap.m.P13nDimMeasurePanel","sap.m.P13nConditionPanel","sap.m.P13nDialog","sap.m.P13nFilterPanel","sap.m.P13nPanel","sap.m.P13nSortPanel","sap.m.Page","sap.m.Panel","sap.m.PDFViewer","sap.m.PlanningCalendar","sap.m.PlanningCalendarHeader","sap.m.Popover","sap.m.ProgressIndicator","sap.m.PullToRefresh","sap.m.QuickView","sap.m.QuickViewBase","sap.m.QuickViewCard","sap.m.QuickViewPage","sap.m.RadioButton","sap.m.RadioButtonGroup","sap.m.RangeSlider","sap.m.RatingIndicator","sap.m.ResponsivePopover","sap.m.ScrollContainer","sap.m.SearchField","sap.m.SegmentedButton","sap.m.Select","sap.m.SelectDialog","sap.m.SelectDialogBase","sap.m.SelectList","sap.m.SelectionDetails","sap.m.Shell","sap.m.SimpleFixFlex","sap.m.SinglePlanningCalendar","sap.m.SinglePlanningCalendarGrid","sap.m.SinglePlanningCalendarMonthGrid","sap.m.Slider","sap.m.SliderTooltip","sap.m.SliderTooltipBase","sap.m.SliderTooltipContainer","sap.m.SlideTile","sap.m.StepInput","sap.m.SplitApp","sap.m.SplitContainer","sap.m.StandardListItem","sap.m.StandardTreeItem","sap.m.StandardTile","sap.m.Switch","sap.m.Table","sap.m.TableSelectDialog","sap.m.TabContainer","sap.m.TabStrip","sap.m.Text","sap.m.TextArea","sap.m.Tile","sap.m.TileContainer","sap.m.TileContent","sap.m.TimePicker","sap.m.TimePickerInputs","sap.m.TimePickerClock","sap.m.TimePickerClocks","sap.m.TimePickerSliders","sap.m.Title","sap.m.ToggleButton","sap.m.Token","sap.m.Tokenizer","sap.m.Toolbar","sap.m.ToolbarSpacer","sap.m.ToolbarSeparator","sap.m.Tree","sap.m.TreeItemBase","sap.m.UploadCollection","sap.m.UploadCollectionToolbarPlaceholder","sap.m.upload.UploadSet","sap.m.upload.UploadSetToolbarPlaceholder","sap.m.upload.UploadSetwithTable","sap.m.upload.UploadSetwithTableItem","sap.m.VariantManagement","sap.m.VBox","sap.m.ViewSettingsDialog","sap.m.WheelSlider","sap.m.WheelSliderContainer","sap.m.Wizard","sap.m.WizardStep","sap.m.semantic.DetailPage","sap.m.semantic.SemanticPage","sap.m.semantic.ShareMenuPage","sap.m.semantic.FullscreenPage","sap.m.semantic.MasterPage","sap.m.p13n.AbstractContainer","sap.m.p13n.BasePanel","sap.m.p13n.Container","sap.m.p13n.GroupPanel","sap.m.p13n.QueryPanel","sap.m.p13n.SelectionPanel","sap.m.p13n.SortPanel","sap.m.p13n.Popup","sap.m.table.columnmenu.Menu"],elements:["sap.m.BadgeCustomData","sap.m.CarouselLayout","sap.m.Column","sap.m.ColumnPopoverActionItem","sap.m.ColumnPopoverCustomItem","sap.m.ColumnPopoverItem","sap.m.ColumnPopoverSortItem","sap.m.ContentConfig","sap.m.DynamicDateOption","sap.m.DynamicDateValueHelpUIType","sap.m.FlexItemData","sap.m.FeedListItemAction","sap.m.IconTabFilter","sap.m.IconTabSeparator","sap.m.ImageCustomData","sap.m.LightBoxItem","sap.m.LinkTileContent","sap.m.OverflowToolbarLayoutData","sap.m.MaskInputRule","sap.m.MenuItem","sap.m.MessageItem","sap.m.MessagePopoverItem","sap.m.PageAccessibleLandmarkInfo","sap.m.P13nFilterItem","sap.m.P13nItem","sap.m.PlanningCalendarRow","sap.m.PlanningCalendarView","sap.m.P13nColumnsItem","sap.m.P13nDimMeasureItem","sap.m.P13nGroupItem","sap.m.P13nSortItem","sap.m.QuickViewGroup","sap.m.QuickViewGroupElement","sap.m.ResponsiveScale","sap.m.SegmentedButtonItem","sap.m.SelectionDetailsItem","sap.m.SelectionDetailsItemLine","sap.m.SinglePlanningCalendarDayView","sap.m.SinglePlanningCalendarMonthView","sap.m.SinglePlanningCalendarWeekView","sap.m.SinglePlanningCalendarWorkWeekView","sap.m.SinglePlanningCalendarView","sap.m.StandardDynamicDateOption","sap.m.SuggestionItem","sap.m.TabContainerItem","sap.m.TabStripItem","sap.m.ToolbarLayoutData","sap.m.UploadCollectionItem","sap.m.UploadCollectionParameter","sap.m.upload.FilePreviewDialog","sap.m.upload.Uploader","sap.m.upload.UploaderTableItem","sap.m.upload.UploadSetItem","sap.m.upload.FilePreviewDialog","sap.m.VariantItem","sap.m.ViewSettingsCustomItem","sap.m.ViewSettingsCustomTab","sap.m.ViewSettingsFilterItem","sap.m.ViewSettingsItem","sap.m.plugins.CellSelector","sap.m.plugins.ColumnResizer","sap.m.plugins.CopyProvider","sap.m.plugins.DataStateIndicator","sap.m.plugins.PasteProvider","sap.m.plugins.PluginBase","sap.m.p13n.AbstractContainerItem","sap.m.semantic.AddAction","sap.m.semantic.CancelAction","sap.m.semantic.DeleteAction","sap.m.semantic.DiscussInJamAction","sap.m.semantic.EditAction","sap.m.semantic.FavoriteAction","sap.m.semantic.FilterAction","sap.m.semantic.FilterSelect","sap.m.semantic.FlagAction","sap.m.semantic.ForwardAction","sap.m.semantic.GroupAction","sap.m.semantic.GroupSelect","sap.m.semantic.MainAction","sap.m.semantic.MessagesIndicator","sap.m.semantic.MultiSelectAction","sap.m.semantic.NegativeAction","sap.m.semantic.OpenInAction","sap.m.semantic.PositiveAction","sap.m.semantic.PrintAction","sap.m.semantic.SaveAction","sap.m.semantic.SemanticButton","sap.m.semantic.SemanticControl","sap.m.semantic.SemanticSelect","sap.m.semantic.SemanticToggleButton","sap.m.semantic.SendEmailAction","sap.m.semantic.SendMessageAction","sap.m.semantic.ShareInJamAction","sap.m.semantic.SortAction","sap.m.semantic.SortSelect","sap.m.table.columnmenu.Entry","sap.m.table.columnmenu.ActionItem","sap.m.table.columnmenu.Item","sap.m.table.columnmenu.ItemBase","sap.m.table.columnmenu.QuickAction","sap.m.table.columnmenu.QuickActionBase"],extensions:{flChangeHandlers:{"sap.m.ActionSheet":{moveControls:"default"},"sap.m.Avatar":"sap/m/flexibility/Avatar","sap.m.Bar":"sap/m/flexibility/Bar","sap.m.Button":"sap/m/flexibility/Button","sap.m.CheckBox":"sap/m/flexibility/CheckBox","sap.m.ColumnListItem":{hideControl:"default",unhideControl:"default"},"sap.m.CustomListItem":{hideControl:"default",unhideControl:"default",moveControls:"default"},"sap.m.DatePicker":{hideControl:"default",unhideControl:"default"},"sap.m.Dialog":"sap/m/flexibility/Dialog","sap.m.ExpandableText":"sap/m/flexibility/ExpandableText","sap.m.FlexBox":{hideControl:"default",unhideControl:"default",moveControls:"default"},"sap.m.HBox":{hideControl:"default",unhideControl:"default",moveControls:"default"},"sap.m.IconTabBar":"sap/m/flexibility/IconTabBar","sap.m.IconTabFilter":"sap/m/flexibility/IconTabFilter","sap.m.Image":{hideControl:"default",unhideControl:"default"},"sap.m.Input":{hideControl:"default",unhideControl:"default"},"sap.m.InputBase":{hideControl:"default",unhideControl:"default"},"sap.m.InputListItem":"sap/m/flexibility/InputListItem","sap.m.Label":"sap/m/flexibility/Label","sap.m.MultiInput":{hideControl:"default",unhideControl:"default"},"sap.m.ListItemBase":{hideControl:"default",unhideControl:"default"},"sap.m.Link":"sap/m/flexibility/Link","sap.m.List":{hideControl:"default",unhideControl:"default",moveControls:"default"},"sap.m.ListBase":{hideControl:"default",unhideControl:"default",moveControls:"default"},"sap.m.MaskInput":{hideControl:"default",unhideControl:"default"},"sap.m.MenuButton":"sap/m/flexibility/MenuButton","sap.m.OverflowToolbar":"sap/m/flexibility/OverflowToolbar","sap.m.OverflowToolbarButton":"sap/m/flexibility/OverflowToolbarButton","sap.m.Page":"sap/m/flexibility/Page","sap.m.Panel":"sap/m/flexibility/Panel","sap.m.Popover":"sap/m/flexibility/Popover","sap.m.RadioButton":"sap/m/flexibility/RadioButton","sap.m.RatingIndicator":{hideControl:"default",unhideControl:"default"},"sap.m.RangeSlider":{hideControl:"default",unhideControl:"default"},"sap.m.ScrollContainer":{hideControl:"default",moveControls:"default",unhideControl:"default"},"sap.m.SearchField":{hideControl:"default",unhideControl:"default"},"sap.m.Slider":{hideControl:"default",unhideControl:"default"},"sap.m.StandardListItem":"sap/m/flexibility/StandardListItem","sap.m.Table":"sap/m/flexibility/Table","sap.m.Column":{hideControl:"default",unhideControl:"default"},"sap.m.Text":"sap/m/flexibility/Text","sap.m.Title":"sap/m/flexibility/Title","sap.m.Toolbar":"sap/m/flexibility/Toolbar","sap.m.VBox":{hideControl:"default",unhideControl:"default",moveControls:"default"},"sap.m.ObjectHeader":{moveControls:"default"},"sap.m.upload.UploadSetwithTable":"sap/m/upload/p13n/flexibility/UploadSetwithTable"},"sap.ui.support":{publicRules:true,internalRules:true}}});v.upload=v.upload||{};v.upload.UploaderHttpRequestMethod=I;v.BackgroundDesign={Solid:"Solid",Transparent:"Transparent",Translucent:"Translucent"};v.UploadSetwithTableActionPlaceHolder={VariantManagementPlaceholder:"VariantManagementPlaceholder",PersonalizationSettingsPlaceholder:"PersonalizationSettingsPlaceholder",UploadButtonPlaceholder:"UploadButtonPlaceholder",CloudFilePickerButtonPlaceholder:"CloudFilePickerButtonPlaceholder"};v.BadgeState={Updated:"Updated",Appear:"Appear",Disappear:"Disappear"};v.BadgeAnimationType={Full:"Full",Update:"Update",None:"None"};v.EmptyIndicatorMode={On:"On",Off:"Off",Auto:"Auto"};v.BadgeStyle={Default:"Default",Attention:"Attention"};v.BarDesign={Auto:"Auto",Header:"Header",SubHeader:"SubHeader",Footer:"Footer"};v.BorderDesign={Solid:"Solid",None:"None"};v.BreadcrumbsSeparatorStyle={Slash:"Slash",BackSlash:"BackSlash",DoubleSlash:"DoubleSlash",DoubleBackSlash:"DoubleBackSlash",GreaterThan:"GreaterThan",DoubleGreaterThan:"DoubleGreaterThan"};v.ButtonType={Default:"Default",Back:"Back",Accept:"Accept",Reject:"Reject",Transparent:"Transparent",Ghost:"Ghost",Up:"Up",Unstyled:"Unstyled",Emphasized:"Emphasized",Critical:"Critical",Negative:"Negative",Success:"Success",Neutral:"Neutral",Attention:"Attention"};v.ButtonAccessibilityType={Default:"Default",Labelled:"Labelled",Described:"Described",Combined:"Combined"};v.CarouselArrowsPlacement={Content:"Content",PageIndicator:"PageIndicator"};v.PlanningCalendarBuiltInView={Hour:"Hour",Day:"Day",Month:"Month",Week:"Week",OneMonth:"One Month"};v.DateTimeInputType={Date:"Date",DateTime:"DateTime",Time:"Time"};v.DialogType={Standard:"Standard",Message:"Message"};v.DialogRoleType={Dialog:"dialog",AlertDialog:"alertdialog"};v.DeviationIndicator={Up:"Up",Down:"Down",None:"None"};v.DraftIndicatorState={Clear:"Clear",Saving:"Saving",Saved:"Saved"};v.FacetFilterListDataType={Date:"Date",DateTime:"DateTime",Time:"Time",Integer:"Integer",Float:"Float",String:"String",Boolean:"Boolean"};v.FacetFilterType={Simple:"Simple",Light:"Light"};v.FlexAlignItems={Start:"Start",End:"End",Center:"Center",Baseline:"Baseline",Stretch:"Stretch",Inherit:"Inherit"};v.FlexAlignSelf={Auto:"Auto",Start:"Start",End:"End",Center:"Center",Baseline:"Baseline",Stretch:"Stretch",Inherit:"Inherit"};v.FlexDirection={Row:"Row",Column:"Column",RowReverse:"RowReverse",ColumnReverse:"ColumnReverse",Inherit:"Inherit"};v.FlexJustifyContent={Start:"Start",End:"End",Center:"Center",SpaceBetween:"SpaceBetween",SpaceAround:"SpaceAround",Inherit:"Inherit"};v.FlexWrap={NoWrap:"NoWrap",Wrap:"Wrap",WrapReverse:"WrapReverse"};v.FlexAlignContent={Start:"Start",End:"End",Center:"Center",SpaceBetween:"SpaceBetween",SpaceAround:"SpaceAround",Stretch:"Stretch",Inherit:"Inherit"};v.FlexRendertype={Div:"Div",List:"List",Bare:"Bare"};v.FrameType={OneByOne:"OneByOne",TwoByOne:"TwoByOne",TwoThirds:"TwoThirds",Auto:"Auto",TwoByHalf:"TwoByHalf",OneByHalf:"OneByHalf",Stretch:"Stretch"};v.LinkConversion={None:"None",ProtocolOnly:"ProtocolOnly",All:"All"};v.LinkAccessibleRole={Default:"Default",Button:"Button"};v.ButtonAccessibleRole={Default:"Default",Link:"Link"};v.InputTextFormatMode={Value:"Value",Key:"Key",ValueKey:"ValueKey",KeyValue:"KeyValue"};v.GenericTagDesign={Full:"Full",StatusIconHidden:"StatusIconHidden"};v.GenericTagValueState={None:"None",Error:"Error"};v.GenericTileMode={ContentMode:"ContentMode",HeaderMode:"HeaderMode",ActionMode:"ActionMode",ArticleMode:"ArticleMode",LineMode:"LineMode",IconMode:"IconMode"};v.Priority={VeryHigh:"VeryHigh",High:"High",Medium:"Medium",Low:"Low",None:"None"};v.GenericTileScope={Display:"Display",Actions:"Actions",ActionMore:"ActionMore",ActionRemove:"ActionRemove"};v.TabsOverflowMode={End:"End",StartAndEnd:"StartAndEnd"};v.ContentConfigType={Text:"Text",Link:"Link"};v.TileSizeBehavior={Responsive:"Responsive",Small:"Small"};v.HeaderLevel={H1:"H1",H2:"H2",H3:"H3",H4:"H4",H5:"H5",H6:"H6"};v.IBarHTMLTag={Div:"Div",Header:"Header",Footer:"Footer"};v.IconTabHeaderMode={Standard:"Standard",Inline:"Inline"};v.IconTabDensityMode={Inherit:"Inherit",Compact:"Compact",Cozy:"Cozy"};v.IconTabFilterDesign={Horizontal:"Horizontal",Vertical:"Vertical"};v.IconTabFilterInteractionMode={Auto:"Auto",Select:"Select",SelectLeavesOnly:"SelectLeavesOnly"};v.ImageMode={Image:"Image",Background:"Background",InlineSvg:"InlineSvg"};v.Size={XS:"XS",S:"S",M:"M",L:"L",Auto:"Auto",Responsive:"Responsive"};v.ValueColor={Neutral:"Neutral",Good:"Good",Critical:"Critical",Error:"Error",None:"None"};v.ValueCSSColor=n.createType("sap.m.ValueCSSColor",{isValid:function(e){var a=v.ValueColor.hasOwnProperty(e);if(a){return a}else{a=p.CSSColor.isValid(e);if(a){return a}else{return p.CSSColor.isValid(P.get(e))}}}},n.getType("string"));v.SelectColumnRatio=n.createType("sap.m.SelectColumnRatio",{isValid:function(e){return/^([0-9]+:[0-9]+)$/.test(e)}},n.getType("string"));v.SelectDialogInitialFocus={List:"List",SearchField:"SearchField"};v.InputType={Text:"Text",Date:"Date",Datetime:"Datetime",DatetimeLocale:"DatetimeLocale",Email:"Email",Month:"Month",Number:"Number",Tel:"Tel",Time:"Time",Url:"Url",Week:"Week",Password:"Password"};v.LabelDesign={Bold:"Bold",Standard:"Standard"};v.ListHeaderDesign={Standard:"Standard",Plain:"Plain"};v.ListMode={None:"None",SingleSelect:"SingleSelect",SingleSelectLeft:"SingleSelectLeft",SingleSelectMaster:"SingleSelectMaster",MultiSelect:"MultiSelect",Delete:"Delete"};v.ListKeyboardMode={Navigation:"Navigation",Edit:"Edit"};v.ListGrowingDirection={Downwards:"Downwards",Upwards:"Upwards"};v.ListSeparators={All:"All",Inner:"Inner",None:"None"};v.ListType={Inactive:"Inactive",Detail:"Detail",Navigation:"Navigation",Active:"Active",DetailAndActive:"DetailAndActive"};v.SelectListKeyboardNavigationMode={None:"None",Delimited:"Delimited"};v.DynamicDateRangeGroups={SingleDates:"SingleDates",DateRanges:"DateRanges",Weeks:"Weeks",Month:"Month",Quarters:"Quarters",Years:"Years"};v.LoadState={Loading:"Loading",Loaded:"Loaded",Failed:"Failed",Disabled:"Disabled"};v.MenuButtonMode={Regular:"Regular",Split:"Split"};v.OverflowToolbarPriority={NeverOverflow:"NeverOverflow",Never:"Never",High:"High",Low:"Low",Disappear:"Disappear",AlwaysOverflow:"AlwaysOverflow",Always:"Always"};v.ObjectHeaderPictureShape={Circle:"Circle",Square:"Square"};v.P13nPanelType={sort:"sort",filter:"filter",group:"group",columns:"columns",dimeasure:"dimeasure",selection:"selection"};v.P13nPopupMode={Dialog:"Dialog",ResponsivePopover:"ResponsivePopover"};v.P13nConditionOperation={BT:"BT",EQ:"EQ",Contains:"Contains",StartsWith:"StartsWith",EndsWith:"EndsWith",LT:"LT",LE:"LE",GT:"GT",GE:"GE",Initial:"Initial",Empty:"Empty",NotBT:"NotBT",NotEQ:"NotEQ",NotContains:"NotContains",NotStartsWith:"NotStartsWith",NotEndsWith:"NotEndsWith",NotLT:"NotLT",NotLE:"NotLE",NotGT:"NotGT",NotGE:"NotGE",NotInitial:"NotInitial",NotEmpty:"NotEmpty",Ascending:"Ascending",Descending:"Descending",GroupAscending:"GroupAscending",GroupDescending:"GroupDescending",Total:"Total",Average:"Average",Minimum:"Minimum",Maximum:"Maximum"};v.P13nConditionOperationType={Include:"Include",Exclude:"Exclude"};v.PageBackgroundDesign={Standard:"Standard",List:"List",Solid:"Solid",Transparent:"Transparent"};v.PanelAccessibleRole={Complementary:"Complementary",Form:"Form",Region:"Region"};v.PDFViewerDisplayType={Auto:"Auto",Embedded:"Embedded",Link:"Link"};v.PlacementType={Left:"Left",Right:"Right",Top:"Top",Bottom:"Bottom",Vertical:"Vertical",VerticalPreferedTop:"VerticalPreferedTop",VerticalPreferredTop:"VerticalPreferredTop",VerticalPreferedBottom:"VerticalPreferedBottom",VerticalPreferredBottom:"VerticalPreferredBottom",Horizontal:"Horizontal",HorizontalPreferedRight:"HorizontalPreferedRight",HorizontalPreferredRight:"HorizontalPreferredRight",HorizontalPreferedLeft:"HorizontalPreferedLeft",HorizontalPreferredLeft:"HorizontalPreferredLeft",PreferredLeftOrFlip:"PreferredLeftOrFlip",PreferredRightOrFlip:"PreferredRightOrFlip",PreferredTopOrFlip:"PreferredTopOrFlip",PreferredBottomOrFlip:"PreferredBottomOrFlip",Auto:"Auto"};v.StandardDynamicDateRangeKeys={DATE:"DATE",DATETIME:"DATETIME",TODAY:"TODAY",YESTERDAY:"YESTERDAY",TOMORROW:"TOMORROW",FIRSTDAYWEEK:"FIRSTDAYWEEK",LASTDAYWEEK:"LASTDAYWEEK",FIRSTDAYMONTH:"FIRSTDAYMONTH",LASTDAYMONTH:"LASTDAYMONTH",FIRSTDAYQUARTER:"FIRSTDAYQUARTER",LASTDAYQUARTER:"LASTDAYQUARTER",FIRSTDAYYEAR:"FIRSTDAYYEAR",LASTDAYYEAR:"LASTDAYYEAR",DATERANGE:"DATERANGE",DATETIMERANGE:"DATETIMERANGE",FROM:"FROM",TO:"TO",FROMDATETIME:"FROMDATETIME",TODATETIME:"TODATETIME",YEARTODATE:"YEARTODATE",DATETOYEAR:"DATETOYEAR",LASTMINUTES:"LASTMINUTES",LASTHOURS:"LASTHOURS",LASTDAYS:"LASTDAYS",LASTWEEKS:"LASTWEEKS",LASTMONTHS:"LASTMONTHS",LASTQUARTERS:"LASTQUARTERS",LASTYEARS:"LASTYEARS",NEXTMINUTES:"NEXTMINUTES",NEXTHOURS:"NEXTHOURS",NEXTDAYS:"NEXTDAYS",NEXTWEEKS:"NEXTWEEKS",NEXTMONTHS:"NEXTMONTHS",NEXTQUARTERS:"NEXTQUARTERS",NEXTYEARS:"NEXTYEARS",TODAYFROMTO:"TODAYFROMTO",THISWEEK:"THISWEEK",LASTWEEK:"LASTWEEK",NEXTWEEK:"NEXTWEEK",SPECIFICMONTH:"SPECIFICMONTH",SPECIFICMONTHINYEAR:"SPECIFICMONTHINYEAR",THISMONTH:"THISMONTH",LASTMONTH:"LASTMONTH",NEXTMONTH:"NEXTMONTH",THISQUARTER:"THISQUARTER",LASTQUARTER:"LASTQUARTER",NEXTQUARTER:"NEXTQUARTER",QUARTER1:"QUARTER1",QUARTER2:"QUARTER2",QUARTER3:"QUARTER3",QUARTER4:"QUARTER4",THISYEAR:"THISYEAR",LASTYEAR:"LASTYEAR",NEXTYEAR:"NEXTYEAR"};v.QuickViewGroupElementType={phone:"phone",mobile:"mobile",email:"email",link:"link",text:"text",pageLink:"pageLink"};v.VerticalPlacementType={Top:"Top",Bottom:"Bottom",Vertical:"Vertical"};v.PopinDisplay={Block:"Block",Inline:"Inline",WithoutHeader:"WithoutHeader"};v.PopinLayout={Block:"Block",GridSmall:"GridSmall",GridLarge:"GridLarge"};v.Sticky={ColumnHeaders:"ColumnHeaders",HeaderToolbar:"HeaderToolbar",InfoToolbar:"InfoToolbar"};v.RatingIndicatorVisualMode={Full:"Full",Half:"Half"};v.ScreenSize={Phone:"Phone",Tablet:"Tablet",Desktop:"Desktop",XXSmall:"XXSmall",XSmall:"XSmall",Small:"Small",Medium:"Medium",Large:"Large",XLarge:"XLarge",XXLarge:"XXLarge"};v.CarouselScrollMode={SinglePage:"SinglePage",VisiblePages:"VisiblePages"};v.SelectionDetailsActionLevel={Item:"Item",List:"List",Group:"Group"};v.SelectType={Default:"Default",IconOnly:"IconOnly"};v.SplitAppMode={ShowHideMode:"ShowHideMode",StretchCompressMode:"StretchCompressMode",PopoverMode:"PopoverMode",HideMode:"HideMode"};v.StandardTileType={Create:"Create",Monitor:"Monitor",None:"None"};v.semantic=v.semantic||{};v.semantic.SemanticRuleSetType={Classic:"Classic",Optimized:"Optimized"};v.table=v.table||{};v.table.columnmenu=v.table.columnmenu||{};v.table.columnmenu.Category={Sort:"Sort",Filter:"Filter",Group:"Group",Aggregate:"Aggregate",Generic:"Generic"};v.ObjectMarkerType={Flagged:"Flagged",Favorite:"Favorite",Draft:"Draft",Locked:"Locked",Unsaved:"Unsaved",LockedBy:"LockedBy",UnsavedBy:"UnsavedBy"};v.ObjectMarkerVisibility={IconOnly:"IconOnly",TextOnly:"TextOnly",IconAndText:"IconAndText"};v.SwipeDirection={LeftToRight:"LeftToRight",RightToLeft:"RightToLeft",BeginToEnd:"BeginToEnd",EndToBegin:"EndToBegin",Both:"Both"};v.SwitchType={Default:"Default",AcceptReject:"AcceptReject"};v.TokenizerRenderMode={Loose:"Loose",Narrow:"Narrow"};v.ToolbarDesign={Auto:"Auto",Transparent:"Transparent",Info:"Info",Solid:"Solid"};v.ToolbarStyle={Standard:"Standard",Clear:"Clear"};v.TimePickerMaskMode={On:"On",Off:"Off"};v.StringFilterOperator={Equals:"Equals",Contains:"Contains",StartsWith:"StartsWith",AnyWordStartsWith:"AnyWordStartsWith"};v.LightBoxLoadingStates={Loading:"LOADING",Loaded:"LOADED",TimeOutError:"TIME_OUT_ERROR",Error:"ERROR"};v.StepInputValidationMode={FocusOut:"FocusOut",LiveChange:"LiveChange"};v.StepInputStepModeType={AdditionAndSubtraction:"AdditionAndSubtraction",Multiple:"Multiple"};v.UploadState={Complete:"Complete",Error:"Error",Ready:"Ready",Uploading:"Uploading"};v.UploadType={Cloud:"Cloud",Native:"Native"};v.WrappingType={Normal:"Normal",Hyphenated:"Hyphenated"};v.SinglePlanningCalendarSelectionMode={SingleSelect:"SingleSelect",MultiSelect:"MultiSelect"};v.PlanningCalendarStickyMode={None:"None",All:"All",NavBarAndColHeaders:"NavBarAndColHeaders"};v.TitleAlignment={None:"None",Auto:"Auto",Start:"Start",Center:"Center"};v.ExpandableTextOverflowMode={InPlace:"InPlace",Popover:"Popover"};v.AvatarShape=S;v.AvatarSize=T;v.AvatarType=f;v.AvatarColor=A;v.AvatarImageFitType=y;v.IllustratedMessageSize=C;v.IllustratedMessageType=h;v.WizardRenderMode={Scroll:"Scroll",Page:"Page"};v.ResetAllMode={Default:"Default",ServiceDefault:"ServiceDefault",ServiceReset:"ServiceReset"};v.SharingMode={Public:"public",Private:"private"};v.MultiSelectMode={Default:"Default",ClearAll:"ClearAll",SelectAll:"SelectAll"};v.plugins=v.plugins||{};v.plugins.CopyPreference={Full:"Full",Cells:"Cells"};v.plugins.ContextMenuScope={Default:"Default",Selection:"Selection"};(function(){sap.ui.lazyRequire("sap.m.DynamicDate");sap.ui.lazyRequire("sap.m.MessageToast","show");sap.ui.lazyRequire("sap.m.routing.RouteMatchedHandler");sap.ui.lazyRequire("sap.m.routing.Router");sap.ui.lazyRequire("sap.m.routing.Target");sap.ui.lazyRequire("sap.m.routing.TargetHandler");sap.ui.lazyRequire("sap.m.routing.Targets")})();if(/sap-ui-xx-formfactor=compact/.test(location.search)){jQuery("html").addClass("sapUiSizeCompact");v._bSizeCompact=true}if(/sap-ui-xx-formfactor=condensed/.test(location.search)){jQuery("html").addClass("sapUiSizeCondensed");v._bSizeCondensed=true}v.getInvalidDate=function(){return null};v.getLocale=function(){var a=new l(e.getLanguageTag());v.getLocale=function(){return a};return a};v.getLocaleData=function(){var e=b.getInstance(v.getLocale());v.getLocaleData=function(){return e};return e};v.isDate=function(e){return e&&Object.prototype.toString.call(e)=="[object Date]"&&!isNaN(e)};v.getIScroll=function(e){if(typeof window.iScroll!="function"||!(e instanceof o)){return}var a,t;for(a=e;a=a.oParent;){t=a.getScrollDelegate?a.getScrollDelegate()._scroller:null;if(t&&t instanceof window.iScroll){return t}}};v.getScrollDelegate=function(e,a){if(!(e instanceof o)){return}var t=sap.ui.require("sap/ui/core/UIComponent");function n(e){if(!e){return}return a&&t&&e instanceof t?e.oContainer:e.oParent}for(var i=e;i=n(i);){if(i&&typeof i.getScrollDelegate=="function"){return i.getScrollDelegate(e)}}};v.ScreenSizes={phone:240,tablet:600,desktop:1024,xxsmall:240,xsmall:320,small:480,medium:560,large:768,xlarge:960,xxlarge:1120};d(v,"BaseFontSize",function(){v.BaseFontSize=jQuery(document.documentElement).css("font-size")||"16px";return v.BaseFontSize});v.closeKeyboard=function(){var e=document.activeElement;if(!t.system.desktop&&e&&/(INPUT|TEXTAREA)/i.test(e.tagName)){e.blur()}};v.touch=v.touch||{};v.touch.find=function(e,a){var t,n;if(!e){return}if(a&&typeof a.identifier!=="undefined"){a=a.identifier}else if(typeof a!=="number"){u(false,"sap.m.touch.find(): oTouch must be a touch object or a number");return}n=e.length;for(t=0;t<n;t++){if(e[t].identifier===a){return e[t]}}};v.touch.countContained=function(e,a){var t,n=0,i,o,r;if(!e){return 0}if(a instanceof Element){a=jQuery(a)}else if(typeof a==="string"){a=jQuery(document.getElementById(a))}else if(!(a instanceof jQuery)){u(false,"sap.m.touch.countContained(): vElement must be a jQuery object or Element reference or a string");return 0}o=a.children().length;i=e.length;for(t=0;t<i;t++){r=jQuery(e[t].target);if(o===0&&r.is(a)||a[0].contains(r[0])){n++}}return n};v.URLHelper=function(){function e(e){return e&&Object.prototype.toString.call(e)=="[object String]"}function a(a){if(!e(a)){return""}return a.replace(/[^0-9\+\*#]/g,"")}function t(a){if(!e(a)){return""}a=a.split(/\r\n|\r|\n/g).join("\r\n");return encodeURIComponent(a)}return jQuery.extend(new i,{normalizeTel:function(e){return"tel:"+a(e)},normalizeSms:function(e){return"sms:"+a(e)},normalizeEmail:function(a,n,i,o,r){var l=[],s="mailto:",p=encodeURIComponent;e(a)&&(s+=p(a.trim()));e(n)&&l.push("subject="+p(n));e(i)&&l.push("body="+t(i));e(r)&&l.push("bcc="+p(r.trim()));e(o)&&l.push("cc="+p(o.trim()));if(l.length){s+="?"+l.join("&")}return s},redirect:function(a,t){u(e(a),this+"#redirect: URL must be a string");this.fireEvent("redirect",a);if(!t){window.location.href=a}else{s(a,"_blank")}},attachRedirect:function(e,a){return this.attachEvent("redirect",e,a)},detachRedirect:function(e,a){return this.detachEvent("redirect",e,a)},triggerTel:function(e){this.redirect(this.normalizeTel(e))},triggerSms:function(e){this.redirect(this.normalizeSms(e))},triggerEmail:function(e,a,t,n,i,o){o=o||false;this.redirect(this.normalizeEmail.apply(0,[e,a,t,n,i]),o)},toString:function(){return"sap.m.URLHelper"}})}();v.BackgroundHelper={addBackgroundColorStyles:function(e,a,t,i){e.class(i||"sapUiGlobalBackgroundColor");if(a&&!n.getType("sap.ui.core.CSSColor").isValid(a)){c.warning(a+" is not a valid sap.ui.core.CSSColor type");a=""}if(a||t){e.style("background-image","none");e.style("filter","none")}if(a){e.style("background-color",a)}},renderBackgroundImageTag:function(e,a,t,n,i,o){e.openStart("div",a.getId()+"-BG");if(Array.isArray(t)){for(var r=0;r<t.length;r++){e.class(t[r])}}else{e.class(t)}e.class("sapUiGlobalBackgroundImage");if(n){e.style("display","block");e.style("background-image","url("+g(n)+")");e.style("background-repeat",i?"repeat":"no-repeat");if(!i){e.style("background-size","cover");e.style("background-position","center")}else{e.style("background-position","left top")}}if(o!==1){if(o>1){o=1}e.style("opacity",o)}e.openEnd();e.close("div")}};v.PopupHelper={calcPercentageSize:function(e,a){if(typeof e!=="string"){c.warning("sap.m.PopupHelper: calcPercentageSize, the first parameter"+e+"isn't with type string");return null}if(e.indexOf("%")<=0){c.warning("sap.m.PopupHelper: calcPercentageSize, the first parameter"+e+"is not a percentage string (for example '25%')");return null}var t=parseFloat(e)/100,n=parseFloat(a);return Math.floor(t*n)+"px"}};v.InputODataSuggestProvider=function(){var e=function(e){var a=e.getSource();var t=a.data(a.getId()+"-#valueListAnnotation");var n=a.getModel();var i=a.getBinding("value");var o=n.resolve(i.getPath(),i.getContext());if(!t){return}var r=e.getParameter("selectedRow");jQuery.each(r.getCells(),function(e,a){var r=a.getBinding("text");jQuery.each(t.outParameters,function(e,a){if(!a.displayOnly&&a.value==r.getPath()){var t=r.getValue();var l=n.resolve(e,i.getContext());if(t&&l!==o){n.setProperty(l,t)}}})});return true};var a=function(a,t){var n=a.getModel();var i=n.oMetadata;var o=n.resolve(a.getBindingPath("value"),a.getBindingContext());var r={};r.searchSupported=false;r.collectionPath="";r.outParameters={};r.inParameters={};r.selection=[];var l=n.getProperty(o+"/#com.sap.vocabularies.Common.v1.ValueList");if(!l){return false}var s=o.substr(o.lastIndexOf("/")+1);r.inProperty=s;jQuery.each(l.record,function(e,a){jQuery.each(a,function(e,a){if(a.property==="SearchSupported"&&a.bool){r.searchSupported=true}if(a.property==="CollectionPath"){r.collectionPath=a.string}if(a.property==="Parameters"){jQuery.each(a.collection.record,function(e,a){if(a.type==="com.sap.vocabularies.Common.v1.ValueListParameterIn"){var t;jQuery.each(a.propertyValue,function(e,a){if(a.property==="LocalDataProperty"){t=a.propertyPath}});jQuery.each(a.propertyValue,function(e,a){if(a.property==="ValueListProperty"){r.inParameters[t]={value:a.string}}})}else if(a.type==="com.sap.vocabularies.Common.v1.ValueListParameterInOut"){var t;jQuery.each(a.propertyValue,function(e,a){if(a.property==="LocalDataProperty"){t=a.propertyPath}});jQuery.each(a.propertyValue,function(e,a){if(a.property==="ValueListProperty"){r.outParameters[t]={value:a.string};r.inParameters[t]={value:a.string}}})}else if(a.type==="com.sap.vocabularies.Common.v1.ValueListParameterOut"){var t;jQuery.each(a.propertyValue,function(e,a){if(a.property==="LocalDataProperty"){t=a.propertyPath}});jQuery.each(a.propertyValue,function(e,a){if(a.property==="ValueListProperty"){r.outParameters[t]={value:a.string}}})}else if(a.type==="com.sap.vocabularies.Common.v1.ValueListParameterDisplayOnly"){var t;jQuery.each(a.propertyValue,function(e,a){if(a.property==="ValueListProperty"){r.outParameters[a.string]={value:a.string,displayOnly:true}}})}})}})});r.resultEntity=i._getEntityTypeByPath("/"+r.collectionPath);r.listItem=new sap.m.ColumnListItem;jQuery.each(r.outParameters,function(e,t){r.listItem.addCell(new sap.m.Text({text:"{"+t.value+"}",wrapping:false}));a.addSuggestionColumn(new sap.m.Column({header:new sap.m.Text({text:"{/#"+r.resultEntity.name+"/"+t.value+"/@sap:label}",wrapping:false})}));r.selection.push(t.value)});a.data(a.getId()+"-#valueListAnnotation",r);if(t){a.attachSuggestionItemSelected(e)}};var t={suggest:function(e,t,n,i){var o,r=e.getSource();t=t===undefined?true:t;n=n===undefined?true:n;if(!r.data(r.getId()+"-#valueListAnnotation")){a(r,n)}o=r.data(r.getId()+"-#valueListAnnotation");if(!o){return}var l=function(e){var a=this.getLength();if(a&&a<=i){r.setShowTableSuggestionValueHelp(false)}else{r.setShowTableSuggestionValueHelp(true)}};if(o.searchSupported){var s=[];var p,m={};if(t){jQuery.each(o.inParameters,function(e,a){if(e==o.inProperty){p=a.value}else if(t){var n=r.getModel().getProperty(e,r.getBinding("value").getContext());if(n){s.push(new sap.ui.model.Filter(a.value,sap.ui.model.FilterOperator.StartsWith,n))}}})}m.search=e.getParameter("suggestValue");if(o.inParameters.length){if(p){m["search-focus"]=p}else{u(false,"no search-focus defined")}}r.bindAggregation("suggestionRows",{path:"/"+o.collectionPath,length:i,filters:s,parameters:{select:o.selection.join(","),custom:m},events:{dataReceived:l},template:o.listItem})}else{var s=[];jQuery.each(o.inParameters,function(a,n){if(a==o.inProperty){s.push(new sap.ui.model.Filter(n.value,sap.ui.model.FilterOperator.StartsWith,e.getParameter("suggestValue")))}else if(t){var i=r.getModel().getProperty(a,r.getBinding("value").getContext());if(i){s.push(new sap.ui.model.Filter(n.value,sap.ui.model.FilterOperator.StartsWith,i))}}});r.bindAggregation("suggestionRows",{path:"/"+o.collectionPath,filters:s,template:o.listItem,length:i,parameters:{select:o.selection.join(",")},events:{dataReceived:l}})}}};return t}();r.set("sap.ui.table.TableHelper",{createLabel:function(e){return new sap.m.Label(e)},createTextView:function(e){return new sap.m.Label(e)},addTableClass:function(){return"sapUiTableM"},bFinal:true});r.set("sap.ui.layout.GridHelper",{getLibrarySpecificClass:function(){return""},bFinal:true});v.FilterPanelField=n.createType("sap.m.FilterPanelField",{isValid:function(e){var a=Object.keys(e);return["label","path"].every(function(e){return a.indexOf(e)!==-1})}},"object");if(t.os.android){jQuery(window).on("resize",function(){var e=document.activeElement;var a=e?e.tagName:"";if(a=="INPUT"||a=="TEXTAREA"){setTimeout(function(){e.scrollIntoViewIfNeeded()},0)}})}if(!Number.MAX_SAFE_INTEGER){Number.MAX_SAFE_INTEGER=Math.pow(2,53)-1}return v});
//# sourceMappingURL=library.js.map