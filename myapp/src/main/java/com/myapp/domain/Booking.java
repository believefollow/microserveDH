package com.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * A Booking.
 */
@Entity
@Table(name = "booking")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Booking implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "arrived_time")
    private LocalDate arrivedTime;

    @Column(name = "leavingtime")
    private LocalDate leavingtime;

    @Column(name = "booking_time")
    private LocalDate bookingTime;

    @ManyToOne
    @JsonIgnoreProperties(value = "bookings", allowSetters = true)
    private Customer customer;

    @ManyToOne
    @JsonIgnoreProperties(value = "bookings", allowSetters = true)
    private Payed payed;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getArrivedTime() {
        return arrivedTime;
    }

    public Booking arrivedTime(LocalDate arrivedTime) {
        this.arrivedTime = arrivedTime;
        return this;
    }

    public void setArrivedTime(LocalDate arrivedTime) {
        this.arrivedTime = arrivedTime;
    }

    public LocalDate getLeavingtime() {
        return leavingtime;
    }

    public Booking leavingtime(LocalDate leavingtime) {
        this.leavingtime = leavingtime;
        return this;
    }

    public void setLeavingtime(LocalDate leavingtime) {
        this.leavingtime = leavingtime;
    }

    public LocalDate getBookingTime() {
        return bookingTime;
    }

    public Booking bookingTime(LocalDate bookingTime) {
        this.bookingTime = bookingTime;
        return this;
    }

    public void setBookingTime(LocalDate bookingTime) {
        this.bookingTime = bookingTime;
    }

    public Customer getCustomer() {
        return customer;
    }

    public Booking customer(Customer customer) {
        this.customer = customer;
        return this;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Payed getPayed() {
        return payed;
    }

    public Booking payed(Payed payed) {
        this.payed = payed;
        return this;
    }

    public void setPayed(Payed payed) {
        this.payed = payed;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Booking)) {
            return false;
        }
        return id != null && id.equals(((Booking) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Booking{" +
            "id=" + getId() +
            ", arrivedTime='" + getArrivedTime() + "'" +
            ", leavingtime='" + getLeavingtime() + "'" +
            ", bookingTime='" + getBookingTime() + "'" +
            "}";
    }
}
