export interface IAdditionalButton {
    iconClass: string;
    action: () => void;

    // todo: remove actionContext
    actionContext: any;
}
