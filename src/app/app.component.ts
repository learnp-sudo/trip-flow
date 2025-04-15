import { Component } from '@angular/core'

export interface Trip {
  start: string
  end: string
  level: number
  isContinued: boolean
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'path-mapper'
  startPoint = ''
  endPoint = ''
  trips: Trip[] = []

  addTrip() {
    if (!this.startPoint || !this.endPoint) return
    if (!this.trips.length) {
      let newTrip: Trip = {
        start: this.startPoint,
        end: this.endPoint,
        level: 1,
        isContinued: false,
      }
      this.trips.push(newTrip)
    }
    else {
      const lastTrip: Trip = this.trips[this.trips.length - 1]
      let newTrip: Trip = {
        start: this.startPoint,
        end: this.endPoint,
        level: 1,
        isContinued: false,
      }
      if (lastTrip && lastTrip.end.toLowerCase() === this.startPoint.toLowerCase()) {
        newTrip.isContinued = true
      }
      else if (lastTrip && lastTrip.end.toLowerCase() === this.endPoint.toLowerCase() && lastTrip.start.toLowerCase() === this.startPoint.toLowerCase()) {
        newTrip.level = 2
      }
      this.trips.push(newTrip)
    }
    this.startPoint = ''
    this.endPoint = ''
  }

  resetTrip() {
    this.trips = []
    this.startPoint = '';
    this.endPoint = '';
  }

  getAbbreviation(location: string): string {
    return location.slice(0, 3).toUpperCase()
  }
}
