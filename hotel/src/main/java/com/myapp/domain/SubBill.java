package com.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * A SubBill.
 */
@Entity
@Table(name = "sub_bill")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class SubBill implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "number")
    private Integer number;

    @Column(name = "total", precision = 21, scale = 2)
    private BigDecimal total;

    @ManyToOne
    @JsonIgnoreProperties(value = "subBills", allowSetters = true)
    private RoomType good;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getNumber() {
        return number;
    }

    public SubBill number(Integer number) {
        this.number = number;
        return this;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public SubBill total(BigDecimal total) {
        this.total = total;
        return this;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
    }

    public RoomType getGood() {
        return good;
    }

    public SubBill good(RoomType roomType) {
        this.good = roomType;
        return this;
    }

    public void setGood(RoomType roomType) {
        this.good = roomType;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SubBill)) {
            return false;
        }
        return id != null && id.equals(((SubBill) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "SubBill{" +
            "id=" + getId() +
            ", number=" + getNumber() +
            ", total=" + getTotal() +
            "}";
    }
}
