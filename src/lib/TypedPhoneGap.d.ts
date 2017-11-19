declare module TypedPhoneGap.Utility {
    interface PluginInfo<T> {
        id: string;
        name: string;
        def: () => T;
    }
    interface Plugin<T> {
        getPlugin(): T;
    }
    function definePlugin<T>(info: PluginInfo<T>): Plugin<T>;
    function field<T>(parent: any, name: string, def?: any): T;
    interface VoidEvent {
        add(handler: () => void): void;
        remove(handler: () => void): void;
        name: string;
    }
    function defineVoidEvent(target: any, name: string): VoidEvent;
    interface TypedEvent<T> {
        add(handler: (evt: T) => void): void;
        remove(handler: (evt: T) => void): void;
        name: string;
    }
    function defineTypedEvent<T>(target: any, name: string): TypedEvent<T>;
}
declare module TypedPhoneGap.Events {
    interface LifeCycleEvent extends Utility.VoidEvent {
    }
    var deviceReady: LifeCycleEvent;
    var pause: LifeCycleEvent;
    var resume: LifeCycleEvent;
    var backButton: LifeCycleEvent;
    var menuButton: LifeCycleEvent;
    var searchButton: LifeCycleEvent;
    var startCallButton: LifeCycleEvent;
    var endCallButton: LifeCycleEvent;
    var volumeDownButton: LifeCycleEvent;
    var volumeUpButton: LifeCycleEvent;
}
declare module TypedPhoneGap.BatteryStatus {
    interface Plugin {
        batteryCritical: BatteryEvent;
        batteryLow: BatteryEvent;
        batteryStatus: BatteryEvent;
    }
    interface BatteryEvent extends Utility.TypedEvent<BatteryEventArgs> {
    }
    interface BatteryEventArgs {
        level: number;
        isPlugged: boolean;
    }
    function getPlugin(): Plugin;
}
declare module TypedPhoneGap.Camera {
    interface Plugin {
        cleanup(onSuccess: () => void, onError: (message: string) => void): void;
        getPicture(cameraSuccess: (data: string) => void, cameraError: (message: string) => void, cameraOptions?: Options): PopoverHandle;
    }
    enum DestinationType {
        DATA_URL = 0,
        FILE_URI = 1,
        NATIVE_URI = 2,
    }
    enum Direction {
        BACK = 0,
        FRONT = 1,
    }
    enum EncodingType {
        JPEG = 0,
        PNG = 1,
    }
    enum MediaType {
        PICTURE = 0,
        VIDEO = 1,
        ALLMEDIA = 2,
    }
    enum PictureSourceType {
        PHOTOLIBRARY = 0,
        CAMERA = 1,
        SAVEDPHOTOALBUM = 2,
    }
    enum PopoverArrowDirection {
        ARROW_UP = 1,
        ARROW_DOWN = 2,
        ARROW_LEFT = 4,
        ARROW_RIGHT = 8,
        ARROW_ANY = 15,
    }
    interface Options {
        quality?: number;
        destinationType?: DestinationType;
        sourceType?: PictureSourceType;
        allowEdit?: boolean;
        encodingType?: EncodingType;
        targetWidth?: number;
        targetHeight?: number;
        mediaType?: MediaType;
        correctOrientation?: boolean;
        saveToPhotoAlbum?: boolean;
        popoverOptions?: PopoverOptions;
        cameraDirection?: Direction;
    }
    interface PopoverHandle {
        setPosition(position: PopoverOptions): void;
    }
    interface PopoverOptions {
        x?: number;
        y?: number;
        width?: number;
        height?: number;
        arrowDir?: PopoverArrowDirection;
    }
    function getPlugin(): Plugin;
}
declare module TypedPhoneGap.Contacts {
    interface Plugin {
        create(properties?: Properties): Contact;
        find(fields: string[], onSuccess: (contacts: Contact[]) => void, onError: (error: Error) => void, options?: FindOptions): void;
    }
    interface Properties {
        id?: string;
        displayName?: string;
        name?: Name;
        nickname?: string;
        phoneNumbers?: Field[];
        emails?: Field[];
        addresses?: Address[];
        ims?: Field[];
        organizations?: Organization[];
        birthday?: Date;
        note?: string;
        photos: Field[];
        categories: Field[];
        urls: Field[];
    }
    interface Error {
        code: ErrorCode;
        message: string;
    }
    interface Name {
        formatted?: string;
        familyName?: string;
        givenName?: string;
        middleName?: string;
        honorifixPrefix?: string;
        honorifixSuffix?: string;
    }
    interface Field {
        pref: boolean;
        type: string;
        value: string;
    }
    interface Address {
        pref?: boolean;
        type?: string;
        formatted?: string;
        streetAddress?: string;
        locality?: string;
        region?: string;
        postalCode?: string;
        country?: string;
    }
    interface Organization {
        pref?: boolean;
        type?: string;
        name?: string;
        department?: string;
        title?: string;
    }
    interface FindOptions {
        filter?: string;
        multiple?: boolean;
    }
    interface Contact extends Properties {
        clone(): Contact;
        remove(onSuccess: () => void, onError: (error: Error) => void): void;
        save(onSuccess: (contact: Contact) => void, onError: (error: Error) => void): void;
    }
    interface ErrorCode {
    }
    module ErrorCode {
        var UnknownError: any;
        var InvalidArgumentError: any;
        var TimeoutError: any;
        var PendingOperationError: any;
        var IOError: any;
        var NotSupportedError: any;
        var PermissionDeniedError: any;
    }
    function getPlugin(): Plugin;
}
declare module TypedPhoneGap.Device {
    interface Plugin {
        cordova: string;
        model: string;
        name: string;
        platform: string;
        uuid: string;
        version: string;
    }
    function getPlugin(): Plugin;
}
declare module TypedPhoneGap.DeviceMotion {
    interface Plugin {
        clearWatch(watchID: WatchHandle): void;
        getCurrentAcceleration(accelerometerSuccess: (acceleration: Acceleration) => void, accelerometerError: () => void): void;
        watchAcceleration(accelerometerSuccess: (acceleration: Acceleration) => void, accelerometerError: () => void, accelerometerOptions?: Options): WatchHandle;
    }
    interface Acceleration {
        x: number;
        y: number;
        z: number;
        timestamp: number;
    }
    interface Options {
        frequency?: number;
    }
    interface WatchHandle {
    }
    function getPlugin(): Plugin;
}
declare module TypedPhoneGap.DeviceOrientation {
    interface Plugin {
        getCurrentHeading(onSuccess: (heading: Heading) => void, onError: (error: Error) => void, options?: Options): void;
        watchHeading(onSuccess: (heading: Heading) => void, onError: (error: Error) => void, options?: Options): WatchHandle;
        clearWatch(id: WatchHandle): void;
    }
    interface Heading {
        magneticHeading: number;
        trueHeading: number;
        headingAccuracy: number;
        timestamp: number;
    }
    interface WatchHandle {
    }
    interface Options {
        filter?: number;
        frequency?: number;
    }
    interface ErrorCode {
    }
    module ErrorCode {
        var InternalError: ErrorCode;
        var NotSupported: ErrorCode;
    }
    interface Error {
        code: ErrorCode;
        message: string;
    }
    function getPlugin(): Plugin;
}
declare module TypedPhoneGap.Dialogs {
    interface Plugin {
        alert(message: string, alertCallback: () => void, title?: string, buttonName?: string): void;
        beep(times: number): void;
        confirm(message: string, confirmCallback: (choice: number) => void, title?: string, buttonLabels?: string[]): void;
        prompt(message: string, promptCallback: (result: PromptResult) => void, title?: string, buttonLabels?: string[], defaultText?: string): void;
    }
    interface PromptResult {
        buttonIndex: number;
        input1: string;
    }
    function getPlugin(): Plugin;
}
declare module TypedPhoneGap.FileSystem {
    interface FileSystemInfo {
        name: string;
        root: DirectoryEntry;
    }
    interface Entry {
        isFile: boolean;
        isDirectory: boolean;
        getMetadata(successCallback: (metadata: Metadata) => void, errorCallback?: (error: Error) => void): void;
        name: string;
        fullPath: string;
        fileSystem: FileSystemInfo;
        moveTo(parent: DirectoryEntry, newName?: string, successCallback?: (entry: Entry) => void, errorCallback?: (error: Error) => void): any;
        copyTo(parent: DirectoryEntry, newName?: string, successCallback?: (entry: Entry) => void, errorCallback?: (error: Error) => void): any;
        toURL(): string;
        remove(successCallback: () => void, errorCallback?: (error: Error) => void): any;
        getParent(successCallback: (entry: Entry) => void, errorCallback?: (error: Error) => void): any;
    }
    interface Metadata {
        modificationTime: Date;
        size: number;
    }
    interface FileEntry extends Entry {
        createWriter(successCallback: (writer: FileWriter) => void, errorCallback?: (error: Error) => void): void;
        file(successCallback: (file: File) => void, errorCallback?: (error: Error) => void): void;
    }
    interface DirectoryEntry extends Entry {
        createReader(): DirectoryReader;
        getFile(path: string, options?: Flags, successCallback?: (entry: FileEntry) => void, errorCallback?: (error: Error) => void): void;
        getDirectory(path: string, options?: Flags, successCallback?: (entry: DirectoryEntry) => void, errorCallback?: (error: Error) => void): void;
        removeRecursively(successCallback: () => void, errorCallback?: (error: Error) => void): void;
    }
    interface Flags {
        create?: boolean;
        exclusive?: boolean;
    }
    interface DirectoryReader {
        readEntries(successCallback: (entries: Entry[]) => void, errorCallback?: (error: Error) => void): void;
    }
    interface FileSaver extends EventTarget {
        abort(): void;
        readyState: number;
        onwritestart: (event: ProgressEvent) => void;
        onprogress: (event: ProgressEvent) => void;
        onwrite: (event: ProgressEvent) => void;
        onabort: (event: ProgressEvent) => void;
        onerror: (event: ProgressEvent) => void;
        onwriteend: (event: ProgressEvent) => void;
        error: Error;
    }
    interface FileWriter extends FileSaver {
        position: number;
        length: number;
        write(data: Blob): void;
        seek(offset: number): void;
        truncate(size: number): void;
    }
}
declare module TypedPhoneGap.FileTransfer {
    interface Plugin {
        createTool(): Tool;
    }
    interface Tool {
        onprogress: (progress: ProgressEvent) => void;
        upload(fileURL: string, server: string, successCallback: (result: FileUploadResult) => void, errorCallback: (error: Error) => void, options?: FileUploadOptions, trustAllHosts?: boolean): void;
        download(source: string, target: string, successCallback: (fileEntry: FileSystem.FileEntry) => void, errorCallback: (error: Error) => void, trustAllHosts: boolean, options?: FileDownloadOptions): void;
        abort(): void;
    }
    interface FileUploadOptions {
        fileKey?: string;
        fileName?: string;
        mimeType?: string;
        params?: any;
        chunkedMode?: boolean;
        headers?: any;
    }
    interface FileDownloadOptions {
        headers?: any;
    }
    interface FileUploadResult {
        bytesSent: number;
        responseCode: number;
        response: string;
        headers: any;
    }
    interface FileTransferError {
        code: ErrorCode;
        source: string;
        target: string;
        http_status: number;
    }
    interface ErrorCode {
    }
    module ErrorCode {
        var Abort: any;
        var ConnectionError: any;
        var FileNotFound: any;
        var InvalidUrl: any;
    }
    function getPlugin(): Plugin;
}
declare module TypedPhoneGap.Geolocation {
    interface Plugin {
        getCurrentPosition(success: (p: Position) => void, error?: (err: PositionError) => void, options?: Options): void;
        watchPosition(success: (p: Position) => void, error?: (err: PositionError) => void, options?: Options): WatchHandle;
        clearWatch(handle: WatchHandle): void;
    }
    interface Options {
        enableHighAccuracy: boolean;
        timeout: number;
        maximumAge: number;
    }
    interface Position {
        coords: Coordinates;
        date: Date;
    }
    interface Coordinates {
        latitude: number;
        longitude: number;
        altitude: number;
        accuracy: number;
        altitudeAccuracy: number;
        heading: number;
        speed: number;
    }
    interface WatchHandle {
    }
    interface PositionError {
        code: ErrorCode;
        message: string;
    }
    interface ErrorCode {
    }
    module ErrorCode {
        var PositionUnavailable: ErrorCode;
        var PermissionDenied: ErrorCode;
        var Timeout: any;
    }
    function getPlugin(): Plugin;
}
declare module TypedPhoneGap.Globalization {
    interface Plugin {
        getPreferredLanguage(onSuccess: (language: {
            value: string;
        }) => void, onError: (error: Error) => void): void;
        getLocaleName(onSuccess: (locale: {
            value: string;
        }) => void, onError: (error: Error) => void): void;
        dateToString(date: Date, onSuccess: (date: {
            value: string;
        }) => void, onError: (error: Error) => void, options?: DateOptions): void;
        stringToDate(dateString: string, onSuccess: (date: DateObject) => void, onError: (error: Error) => void, options?: DateOptions): void;
        getDatePattern(onSuccess: (datePattern: DatePattern) => void, onError: (error: Error) => void, options?: DateOptions): void;
        getDateNames(onSuccess: (names: {
            value: string[];
        }) => void, onError: (error: Error) => void, options?: DateNameOptions): void;
        isDaylightSavingsTime(date: Date, onSuccess: (result: {
            dst: boolean;
        }) => void, onError: (error: Error) => void): void;
        getFirstDayOfWeek(onSuccess: (day: {
            value: number;
        }) => void, onError: (error: Error) => void): void;
        nubmerToString(value: number, onSuccess: (result: {
            value: string;
        }) => void, onError: (error: Error) => void, format?: NumberFormat): void;
        stringToNumber(value: string, onSuccess: (result: {
            value: number;
        }) => void, onError: (error: Error) => void, format?: NumberFormat): void;
        getNumberPattern(onSuccess: (result: NumberPattern) => void, onError: (error: Error) => void, format?: NumberFormat): void;
        getCurrencyPattern(currencyCode: string, onSuccess: (result: CurrencyPattern) => void, onError: (error: Error) => void): void;
    }
    interface DateOptions {
        formatLength?: FormatLength;
        selector?: DateSelector;
    }
    interface FormatLength {
    }
    module FormatLength {
        var long: FormatLength;
        var medium: FormatLength;
        var short: FormatLength;
    }
    interface DateSelector {
    }
    module DateSelector {
        var date: DateSelector;
        var dateAndTime: DateSelector;
        var time: DateSelector;
    }
    interface DateObject {
        year: number;
        month: number;
        day: number;
        hour: number;
        minute: number;
        second: number;
        millisecond: number;
    }
    interface NumberFormat {
        type: NumberFormatType;
    }
    interface NumberFormatType {
    }
    module NumberFormatType {
        var currency: NumberFormatType;
        var decimal: NumberFormatType;
        var percent: NumberFormatType;
    }
    interface DatePattern {
        pattern: string;
        timezone: string;
        utc_offset: number;
        dst_offset: number;
    }
    interface DateNameOptions {
        type: DateWidth;
        item: DateNameVariant;
    }
    interface DateNameVariant {
    }
    module DateNameVariant {
        var days: DateNameVariant;
        var months: DateNameVariant;
    }
    interface DateWidth {
    }
    module DateWidth {
        var narrow: DateWidth;
        var wide: DateWidth;
    }
    interface NumberPattern {
        pattern: string;
        symbol: string;
        fraction: number;
        rounding: number;
        positive: string;
        negative: string;
        decimal: string;
        grouping: string;
    }
    interface CurrencyPattern {
        pattern: string;
        code: string;
        fraction: number;
        rounding: number;
        decimal: string;
        grouping: string;
    }
    enum ErrorCode {
        UnknownError = 0,
        FormattingError = 1,
        ParsingError = 2,
        PatternError = 3,
    }
    interface Error {
        code: ErrorCode;
        message: string;
    }
    function getPlugin(): Plugin;
}
declare module TypedPhoneGap.InAppBrowser {
    interface Plugin {
        openWindow(url: string, target?: Target, options?: Options): Window;
    }
    interface EventType {
    }
    module EventType {
        var exit: EventType;
        var loadError: EventType;
        var loadStart: EventType;
        var loadStop: EventType;
    }
    interface PresentationStyle {
    }
    module PresentationStyle {
        var formSheet: PresentationStyle;
        var fullScreen: PresentationStyle;
        var pageSheet: PresentationStyle;
    }
    interface ToolbarPosition {
    }
    module ToolbarPosition {
        var bottom: ToolbarPosition;
        var top: ToolbarPosition;
    }
    interface TransitionStyle {
    }
    module TransitionStyle {
        var coverVertical: TransitionStyle;
        var crossDissolve: TransitionStyle;
        var flipHorizontal: TransitionStyle;
    }
    interface Options {
        location?: boolean;
        closeButtonCaption?: string;
        hidden?: boolean;
        clearCache?: boolean;
        clearSessionCache?: boolean;
        disallowOverScroll?: boolean;
        toolbar?: boolean;
        enableViewportScale?: boolean;
        mediaPlaybackRequiresUserAction?: boolean;
        allowInlineMediaPlayback?: boolean;
        keyboardDisplayRequiresUserAction?: boolean;
        suppressesIncrementalRendering?: boolean;
        presentationStyle?: PresentationStyle;
        transitionStyle?: TransitionStyle;
        toolbarPosition?: ToolbarPosition;
    }
    interface InAppBrowserEvent {
        type: EventType;
        url: string;
        code: number;
        message: string;
    }
    interface Window {
        addEventListener(event: EventType, handler: (evt: InAppBrowserEvent) => void): any;
        removeEventListener(event: EventType, handler: (evt: InAppBrowserEvent) => void): any;
        close(): void;
        show(): void;
        executeScript(script: {
            code: string;
        }, callback: (result: any) => void): any;
        executeScript(script: {
            file: string;
        }, callback: (result: any) => void): any;
        insertCSS(css: {
            code: string;
        }, callback: () => void): any;
        insertCSS(css: {
            file: string;
        }, callback: () => void): any;
    }
    interface Target {
    }
    module Target {
        function custom(target: string): Target;
        var blank: Target;
        var self: Target;
        var system: Target;
    }
    function getPlugin(): Plugin;
}
declare module TypedPhoneGap.Media {
    interface Plugin {
        createItem(src: string, mediaSuccess?: () => void, mediaError?: (error: Error) => void, mediaStatus?: (status: Status) => void): Item;
    }
    interface Item {
        getCurrentPosition(onSuccess: (position: number) => void, onError?: (error: Error) => void): void;
        getDuration(): number;
        play(): void;
        pause(): void;
        release(): void;
        seekTo(position: number): void;
        setVolume(volume: number): void;
        startRecord(): void;
        stopRecord(): void;
        stop(): void;
        position: number;
        duration: number;
    }
    interface ErrorCode {
    }
    module ErrorCode {
        var Aborted: ErrorCode;
        var DecodeError: ErrorCode;
        var NetworkError: ErrorCode;
        var NoneSupported: ErrorCode;
    }
    interface Error {
        code: ErrorCode;
        message: string;
    }
    enum Status {
        None = 0,
        Starting = 1,
        Running = 2,
        Paused = 3,
        Stopped = 4,
    }
    function getPlugin(): Plugin;
}
declare module TypedPhoneGap.MediaCapture {
    interface Plugin {
        captureAudio(onSuccess: (mediaFiles: MediaFile[]) => void, onError: (error: Error) => void, options?: AudioOptions): void;
        captureImage(onSuccess: (mediaFiles: MediaFile[]) => void, onError: (error: Error) => void, options?: ImageOptions): void;
        captureVideo(onSuccess: (mediaFiles: MediaFile[]) => void, onError: (error: Error) => void, options?: VideoOptions): void;
        supportedAudioModes: ConfigurationData[];
        supportedImageModes: ConfigurationData[];
        supportedVideoModes: ConfigurationData[];
    }
    interface MediaFile {
        name: string;
        fullPath: string;
        type: string;
        lastModifiedDate: Date;
        size: number;
        getFormatData(successCallback: (data: MediaFileData) => void, errorCallback?: () => void): any;
    }
    interface MediaFileData {
        codecs: string;
        bitrate: number;
        height: number;
        width: number;
        duration: number;
    }
    interface ErrorCode {
    }
    module ErrorCode {
        var Internal: ErrorCode;
        var ApplicationBusy: ErrorCode;
        var InvalidArgument: ErrorCode;
        var NoMediaFiles: ErrorCode;
        var NotSupported: ErrorCode;
    }
    interface Error {
        code: ErrorCode;
        message: string;
    }
    interface AudioOptions {
        limit?: number;
        duration?: number;
    }
    interface ImageOptions {
        limit?: number;
    }
    interface VideoOptions {
        limit?: number;
        duration?: number;
    }
    interface ConfigurationData {
        type: string;
        height: number;
        width: number;
    }
    function getPlugin(): Plugin;
}
declare module TypedPhoneGap.NetworkInformation {
    interface Plugin {
        connection: Connection;
        offline: NetworkEvent;
        online: NetworkEvent;
    }
    interface Connection {
        type: ConnectionType;
        UNKNOWN: ConnectionType;
        ETHERNET: ConnectionType;
        WIFI: ConnectionType;
        CELL_2G: ConnectionType;
        CELL_3G: ConnectionType;
        CELL_4G: ConnectionType;
        CELL: ConnectionType;
        NONE: ConnectionType;
    }
    interface ConnectionType {
    }
    interface NetworkEvent extends Utility.VoidEvent {
    }
    function getPlugin(): Plugin;
}
declare module TypedPhoneGap.SplashScreen {
    interface Plugin {
        hide(): void;
        show(): void;
    }
    function getPlugin(): Plugin;
}
declare module TypedPhoneGap.Vibration {
    interface Plugin {
        vibrate(time: number): void;
    }
    function getPlugin(): Plugin;
}
