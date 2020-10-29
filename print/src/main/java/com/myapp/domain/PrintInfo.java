package com.myapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A PrintInfo.
 */
@Entity
@Table(name = "print_info")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class PrintInfo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "base_info")
    private String baseInfo;

    @OneToOne
    @JoinColumn(unique = true)
    private Bill bill;

    @OneToOne
    @JoinColumn(unique = true)
    private Payed payed;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBaseInfo() {
        return baseInfo;
    }

    public PrintInfo baseInfo(String baseInfo) {
        this.baseInfo = baseInfo;
        return this;
    }

    public void setBaseInfo(String baseInfo) {
        this.baseInfo = baseInfo;
    }

    public Bill getBill() {
        return bill;
    }

    public PrintInfo bill(Bill bill) {
        this.bill = bill;
        return this;
    }

    public void setBill(Bill bill) {
        this.bill = bill;
    }

    public Payed getPayed() {
        return payed;
    }

    public PrintInfo payed(Payed payed) {
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
        if (!(o instanceof PrintInfo)) {
            return false;
        }
        return id != null && id.equals(((PrintInfo) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PrintInfo{" +
            "id=" + getId() +
            ", baseInfo='" + getBaseInfo() + "'" +
            "}";
    }
}
