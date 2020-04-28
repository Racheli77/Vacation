
export class VacationModel {
    public constructor(
        public vacationID?: number,
        public description?: string,
        public destination?: string,
        public picFileName?: File,
        public startDate?: string,
        public endDate?: string,
        public price?: number) {
    }
}
