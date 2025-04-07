export interface ITourStep {
    id: string;
    content: string;
}
  
  
export interface ITourGuideProps {
    steps: ITourStep[];
    isTourActive:boolean;
    onClose: () => void;
    handleCompleted:()=>void;
}


export interface IOverlayProps {
    activeElementId: string;
    totalElements: string[];
}
  