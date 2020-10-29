package com.myapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * A RoomType.
 */
@Entity
@Table(name = "room_type")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class RoomType implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "number")
    private Integer number;

    @Column(name = "feature")
    private String feature;

    @Column(name = "price", precision = 21, scale = 2)
    private BigDecimal price;

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

    public RoomType number(Integer number) {
        this.number = number;
        return this;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }

    public String getFeature() {
        return feature;
    }

    public RoomType feature(String feature) {
        this.feature = feature;
        return this;
    }

    public void setFeature(String feature) {
        this.feature = feature;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public RoomType price(BigDecimal price) {
        this.price = price;
        return this;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof RoomType)) {
            return false;
        }
        return id != null && id.equals(((RoomType) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "RoomType{" +
            "id=" + getId() +
            ", number=" + getNumber() +
            ", feature='" + getFeature() + "'" +
            ", price=" + getPrice() +
            "}";
    }
}
