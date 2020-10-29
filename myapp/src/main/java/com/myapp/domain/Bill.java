package com.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * A Bill.
 */
@Entity
@Table(name = "bill")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Bill implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "balance", precision = 21, scale = 2)
    private BigDecimal balance;

    @Column(name = "finished")
    private Boolean finished;

    @OneToOne
    @JoinColumn(unique = true)
    private Receipt receipt;

    @ManyToOne
    @JsonIgnoreProperties(value = "bills", allowSetters = true)
    private SubBill subBill;

    @ManyToOne
    @JsonIgnoreProperties(value = "bills", allowSetters = true)
    private Payed payed;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigDecimal getBalance() {
        return balance;
    }

    public Bill balance(BigDecimal balance) {
        this.balance = balance;
        return this;
    }

    public void setBalance(BigDecimal balance) {
        this.balance = balance;
    }

    public Boolean isFinished() {
        return finished;
    }

    public Bill finished(Boolean finished) {
        this.finished = finished;
        return this;
    }

    public void setFinished(Boolean finished) {
        this.finished = finished;
    }

    public Receipt getReceipt() {
        return receipt;
    }

    public Bill receipt(Receipt receipt) {
        this.receipt = receipt;
        return this;
    }

    public void setReceipt(Receipt receipt) {
        this.receipt = receipt;
    }

    public SubBill getSubBill() {
        return subBill;
    }

    public Bill subBill(SubBill subBill) {
        this.subBill = subBill;
        return this;
    }

    public void setSubBill(SubBill subBill) {
        this.subBill = subBill;
    }

    public Payed getPayed() {
        return payed;
    }

    public Bill payed(Payed payed) {
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
        if (!(o instanceof Bill)) {
            return false;
        }
        return id != null && id.equals(((Bill) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Bill{" +
            "id=" + getId() +
            ", balance=" + getBalance() +
            ", finished='" + isFinished() + "'" +
            "}";
    }
}
