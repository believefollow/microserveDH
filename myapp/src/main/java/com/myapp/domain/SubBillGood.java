package com.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * A SubBillGood.
 */
@Entity
@Table(name = "sub_bill_good")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class SubBillGood implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "number")
    private Integer number;

    @Column(name = "total", precision = 21, scale = 2)
    private BigDecimal total;

    @ManyToOne
    @JsonIgnoreProperties(value = "subBillGoods", allowSetters = true)
    private Storage good;

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

    public SubBillGood number(Integer number) {
        this.number = number;
        return this;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public SubBillGood total(BigDecimal total) {
        this.total = total;
        return this;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
    }

    public Storage getGood() {
        return good;
    }

    public SubBillGood good(Storage storage) {
        this.good = storage;
        return this;
    }

    public void setGood(Storage storage) {
        this.good = storage;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SubBillGood)) {
            return false;
        }
        return id != null && id.equals(((SubBillGood) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "SubBillGood{" +
            "id=" + getId() +
            ", number=" + getNumber() +
            ", total=" + getTotal() +
            "}";
    }
}
