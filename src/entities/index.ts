/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: eventschedule
 * Interface for EventSchedule
 */
export interface EventSchedule {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  eventName?: string;
  /** @wixFieldType time */
  startTime?: any;
  /** @wixFieldType time */
  endTime?: any;
  /** @wixFieldType text */
  location?: string;
  /** @wixFieldType text */
  description?: string;
}


/**
 * Collection ID: guestphotos
 * Interface for GuestPhotos
 */
export interface GuestPhotos {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  photo?: string;
  /** @wixFieldType text */
  uploaderName?: string;
  /** @wixFieldType text */
  caption?: string;
  /** @wixFieldType datetime */
  uploadDate?: Date | string;
  /** @wixFieldType boolean */
  isApproved?: boolean;
  /** @wixFieldType text */
  eventTag?: string;
}


/**
 * Collection ID: rsvps
 * Interface for RSVPs
 */
export interface RSVPs {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  guestName?: string;
  /** @wixFieldType text */
  emailAddress?: string;
  /** @wixFieldType boolean */
  isAttending?: boolean;
  /** @wixFieldType number */
  numberOfGuests?: number;
  /** @wixFieldType text */
  dietaryRestrictions?: string;
  /** @wixFieldType text */
  attendingStatus?: string;
  /** @wixFieldType text */
  message?: string;
}
