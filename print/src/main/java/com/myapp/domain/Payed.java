package com.myapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.math.BigDecimal;

import com.myapp.domain.enumeration.Source;

/**
 * A Payed.
 */
@Entity
@Table(name = "payed")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Payed implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "source")
    private Source source;

    @Column(name = "pay_id")
    private String payId;

    @Column(name = "amount", precision = 21, scale = 2)
    private BigDecimal amount;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Source getSource() {
        return source;
    }

    public Payed source(Source source) {
        this.source = source;
        return this;
    }

    public void setSource(Source source) {
        this.source = source;
    }

    public String getPayId() {
        return payId;
    }

    public Payed payId(String payId) {
        this.payId = payId;
        return this;
    }

    public void setPayId(String payId) {
        this.payId = payId;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public Payed amount(BigDecimal amount) {
        this.amount = amount;
        return this;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Payed)) {
            return false;
        }
        return id != null && id.equals(((Payed) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Payed{" +
            "id=" + getId() +
            ", source='" + getSource() + "'" +
            ", payId='" + getPayId() + "'" +
            ", amount=" + getAmount() +
            "}";
    }
}
